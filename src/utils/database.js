import { isNull } from './tools'

const database = Object.create(null)

const baseDb = {
  name: 'notes',
  version: 1,
  store: ['todo', 'tags', 'ui', 'user', 'search', 'weather', 'time', 'namespace'],
  index: {
    todo: ['namespace', 'tags', 'start_time', 'end_time']
  }
}

const isHasStore = (name, storeName) => database[name].db.objectStoreNames.contains(storeName)

export const createDb = (name, version) => {
  isNull(name) && (name = baseDb.name)
  isNull(version) && (version = baseDb.version)
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version)
    database[name] = Object.create(null)
    request.onsuccess = function (e) {
      database[name].version = version
      database[name].db = e.target.result
      resolve(e.target.result)
    }
    request.onerror = reject
    request.onupgradeneeded = function (e) {
      database[name].db = e.target.result
      baseDb.store.forEach(storeName => {
        if (!isHasStore(name, storeName)) {
          const objectStore = database[name].db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
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

export const closeDb = (name) => {
  isNull(name) && (name = baseDb.name)
  database[name].db.close()
}

export const deleteDb = (name) => {
  isNull(name) && (name = baseDb.name)
  window.indexedDB.deleteDatabase(name)
}

const asyncAddData = (store, data) => {
  return new Promise((resolve, reject) => {
    const request = store.add(data)
    request.onsuccess = resolve
    request.onerror = reject
  })
}

export const addData = (data, storeName, name) => {
  isNull(name) && (name = baseDb.name)
  isNull(storeName) && (storeName = name)
  return new Promise((resolve, reject) => {
    if (!isHasStore(name, storeName)) {
      database[name].db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
    }
    const transaction = database[name].db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    if (Array.isArray(data)) {
      Promise.all(
        data.map(item => asyncAddData(store, item))
      ).then(resolve).catch(reject)
    } else {
      asyncAddData(store, data).then(e => {
        resolve(e.target.result)
      }).catch(reject)
    }
  })
}

export const getDataDetail = (id, storeName, name) => {
  isNull(name) && (name = baseDb.name)
  isNull(storeName) && (storeName = name)
  if (isHasStore(name, storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database[name].db.transaction(storeName, 'readonly')
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

export const getDataList = (storeName, name) => {
  isNull(name) && (name = baseDb.name)
  isNull(storeName) && (storeName = name)
  if (isHasStore(name, storeName)) {
    return new Promise((resolve, reject) => {
      const res = []
      const transaction = database[name].db.transaction(storeName, 'readonly')
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
    console.error('get data error', 'store ' + storeName + ' not exit!')
    return false
  }
}

export const putData = (data, storeName, name) => {
  isNull(name) && (name = baseDb.name)
  isNull(storeName) && (storeName = name)
  if (isHasStore(name, storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database[name].db.transaction(storeName, 'readwrite')
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

export const delData = (keyPath, storeName, name) => {
  isNull(name) && (name = baseDb.name)
  isNull(storeName) && (storeName = name)
  if (isHasStore(name, storeName)) {
    return new Promise((resolve, reject) => {
      const transaction = database[name].db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(keyPath)
      request.onsuccess = resolve
      request.onerror = reject
    })
  } else {
    console.error('put data error', 'store ' + storeName + ' not exit!')
    return false
  }
}
