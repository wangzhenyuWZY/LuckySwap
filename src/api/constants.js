import axios from 'axios'
const qs = require('qs')
const server = {
  development: 'http://8.218.15.165:8011/',
  production: 'http://8.218.15.165:8011/'
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
  const onetoken = sessionStorage.getItem('oneToken')
  if (onetoken && url !== 'api/connection') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + onetoken
  }
  if (url == 'api/connection') {
    axios.defaults.headers.common['Authorization'] = ''
  }
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
