import { isNull } from './tools'

let database = Object.create(null)

const baseDb = {
  name: 'notes',
  version: 1,
  store: ['todo', 'tags', 'ui', 'user', 'search', 'weather', 'time', 'namespace'],
  index: {
    todo: ['namespace', 'tags', 'start_time', 'end_time']
  }
}

const isHasStore = (storeName) => database.objectStoreNames.contains(storeName)

export const createDb = (name, version) => {
  isNull(name) && (name = baseDb.name)
  isNull(version) && (version = baseDb.version)
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version)
    request.onsuccess = function (e) {
      database = e.target.result
      resolve(e.target.result)
    }
    request.onerror = reject
    request.onupgradeneeded = function (e) {
      database = e.target.result
      baseDb.store.forEach(storeName => {
        if (!isHasStore(storeName)) {
          const objectStore = database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
          if (storeName in baseDb.index) {
            baseDb.index[storeName].forEach(indexName => {
              objectStore.createIndex(indexName, indexName, { unique: false })
            })
          }
        }
      })
    }
  })
}

export const closeDb = () => database.close()

export const deleteDb = (name) => {
  isNull(name) && (name = baseDb.name)
  window.indexedDB.deleteDatabase(name)
}

const asyncAddData = (store, data) => {
  return new Promise((resolve, reject) => {
    const request = store.add(data)
    request.onsuccess = e => resolve(e.target.result)
    request.onerror = reject
  })
}

export const addData = (data, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    if (Array.isArray(data)) {
      Promise.all(
        data.map(item => asyncAddData(store, item))
      ).then(resolve).catch(reject)
    } else {
      asyncAddData(store, data).then(resolve).catch(reject)
    }
  })
}

export const getDataDetail = (id, storeName) => {
  if (isHasStore(storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)
      request.onsuccess = function (e) {
        resolve(e.target.result)
      }
      request.onerror = reject
    })
  } else {
    console.error('get data error', 'store ' + storeName + ' not exit!')
    return false
  }
}

export const getDataList = (storeName) => {
  if (isHasStore(storeName)) {
    return new Promise((resolve, reject) => {
      const res = []
      const transaction = database.transaction(storeName, 'readonly')
      const request = transaction.objectStore(storeName).openCursor()
      request.onsuccess = function (e) {
        const cursor = e.target.result
        if (cursor) {
          cursor.continue()
          res.push(cursor.value)
        } else {
          resolve(res)
        }
      }
      request.onerror = reject
    })
  } else {
    console.error('get data list error', 'store ' + storeName + ' not exit!')
    return false
  }
}

export const putData = (data, storeName) => {
  if (isHasStore(storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)
      request.onsuccess = resolve
      request.onerror = reject
    })
  } else {
    console.error('put data error', 'store ' + storeName + ' not exit!')
    return false
  }
}

export const delData = (keyPath, storeName) => {
  if (isHasStore(storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(keyPath)
      request.onsuccess = resolve
      request.onerror = reject
    })
  } else {
    console.error('del data error', 'store ' + storeName + ' not exit!')
    return false
  }
}

const asyncSearch = (store, index, range, cb, ...value) => {
  const res = []
  if (typeof cb !== 'function') {
    value = [cb, ...value]
  }
  return new Promise((resolve, reject) => {
    const request = store.index(index).openCursor(IDBKeyRange[range](...value))
    request.onsuccess = e => {
      const cursor = e.target.result
      if (cursor) {
        cursor.continue()
        if (typeof cb === 'function') {
          if (cb(cursor.value)) {
            res.push(cursor.value)
          }
        } else {
          res.push(cursor.value)
        }
      } else {
        resolve(res)
      }
    }
    request.onerror = reject
  })
}

const searchStartTime = async (store, key, param) => {
  const filters = (data) => {
    let res = true
    if (param.namespace && param.namespace !== data.namespace) {
      res = false
    }
    if (res && param.tags) {
      if (!data.tags || (data.tags && !data.tags.includes(param.tags))) {
        res = false
      }
    }
    return res
  }
  if (Array.isArray(param[key])) {
    return asyncSearch(
      store,
      key,
      'bound',
      filters,
      param[key][0],
      param[key][1]
    )
  }
  return asyncSearch(
    store,
    key,
    'lowerBound',
    filters,
    param[key]
  )
}

const searchNamespace = async (store, key, param) => {
  return asyncSearch(
    store,
    key,
    'only',
    param[key]
  )
}

// controller todos
export const searchTodoList = (param) => {
  const transaction = database.transaction('todo', 'readonly')
  const store = transaction.objectStore('todo')
  if (param.start_time) {
    return searchStartTime(store, 'start_time', param)
  }
  if (param.namespace) {
    return searchNamespace(store, 'namespace', param)
  }
}
