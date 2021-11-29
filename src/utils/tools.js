export const isNull = val => val === undefined || val === null

/**
 * @description 将日期处理成指定格式的字符串
 * @param {Date|String|Number} date 原日期
 * @param {String} format 日期格式，默认值 'yyyy-MM-dd hh:mm:ss'
 * @returns 指定日期格式的日期字符串
 */
export const timeFormat = (date, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (isNull(date)) {
    return date
  }
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  const formatObj = Object.create(null)
  formatObj.yyyy = date.getFullYear()
  formatObj.M = date.getMonth() + 1
  formatObj.MM = formatObj.M.toString().padStart(2, '0')
  formatObj.d = date.getDate()
  formatObj.dd = formatObj.d.toString().padStart(2, '0')
  formatObj.H = date.getHours()
  formatObj.HH = formatObj.H.toString().padStart(2, '0')
  formatObj.h = formatObj.H > 12 ? formatObj.H - 12 : formatObj.H
  formatObj.hh = formatObj.h.toString().padStart(2, '0')
  formatObj.m = date.getMinutes()
  formatObj.mm = formatObj.m.toString().padStart(2, '0')
  formatObj.s = date.getSeconds()
  formatObj.ss = formatObj.s.toString().padStart(2, '0')
  formatObj.W = date.getDay()

  return format.replace(/(yyyy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s|W)/g, (result, key) => {
    // Note: getDay() returns 0 on Sunday
    if (key === 'W') {
      return ['日', '一', '二', '三', '四', '五', '六'][formatObj[key]]
    }
    if (key in formatObj) {
      return formatObj[key]
    }
    return result
  })
}

export const deepClone = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    let newObj
    if (!obj.prototype) {
      newObj = {}
    } else {
      newObj = Object.create(obj.prototype.constructor)
    }
    for (const k in obj) {
      newObj[k] = obj[k]
    }
    return newObj
  }
  return obj
}
