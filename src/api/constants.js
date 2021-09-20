import axios from 'axios'
const qs = require('qs')
const server = {
  development: 'http://54.151.206.77:8085/',
  production: 'http://54.151.206.77:8085/'
}

const jsonUrl = (json) => {
  const arr = []
  let str = ''
  for (const i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

export const fet = (url, data, method, postHeaders) => {
  const realUrl = server[process.env.NODE_ENV] + url
  const type = method.toLowerCase()
  let res = {}
  if (type === 'get') {
    res = axios.get(realUrl + '?' + jsonUrl(data))
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'post') {
    res = axios.post(realUrl, qs.stringify(data), postHeaders)
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'put') {
    res = axios.put(realUrl, qs.stringify(data), postHeaders)
      .catch(function(error) {
        alert(error)
      })
  }
  return res
}
