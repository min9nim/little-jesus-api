export * from './pure'
import {assignQueryParams, peek} from './pure'
import moment from 'moment'
import createLogger from 'if-logger'
import {gql} from 'apollo-server'

const logger = createLogger().addTags('utils')

export function markError(args) {
  // 예외에 부가정보를 세팅한다
  return e => {
    Object.assign(e, args)
    throw e
  }
}

// 디버깅용 전역함수
// global.log = (...args: any[]): void => {
//   const serialized = args.map((arg) => {
//     if(typeof arg === 'object'){
//       return JSON.stringify(arg, null, 2)
//     }else if(typeof arg === 'function'){
//       return arg.toString()
//     }
//     return arg
//   })
//   // eslint-disable-next-line
//   console.log(...serialized)
// }
// global.peek = peek

export function installScript(apiUrl: string) {
  return new Promise(resolve => {
    const script: any = window.document.createElement('script')
    const load = () => {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        setTimeout(() => {
          resolve()
        }, 500)
      }
    }
    script.src = apiUrl
    script.onload = load
    script.onreadystatechange = load
    window.document.getElementsByTagName('head')[0].appendChild(script)
  })
}

export function forceFileDownload(blob, name) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  link.click()
}

export async function download({uri, name}) {
  const response = await window.fetch(uri)
  const blob = await response.blob()
  forceFileDownload(blob, name)
}

export function getHostname(url) {
  let start = url.indexOf('://') + 3
  let end = url.indexOf('/', start)
  return url.slice(start, end)
}

export function getProtocol(url) {
  let end = url.indexOf('://') + 3
  return url.slice(0, end)
}

export const appendQueryParams = paramObj => {
  return assignQueryParams(location.href)(paramObj)
}

export function copyToClipboard(val) {
  let t = document.createElement('textarea')
  document.body.appendChild(t)
  t.value = val
  t.select()
  document.execCommand('copy')
  document.body.removeChild(t)
}

export function getClientIp(req) {
  const notFound = 'x.x.x.x'
  if (req.headers) {
    const forwarded = req.headers['x-forwarded-for']
    if (forwarded) {
      return forwarded.split(',').pop() || notFound
    }
  }
  if (req.connection) {
    if (req.connection.remoteAddress) {
      return req.connection.remoteAddress || notFound
    }
    if (req.connection.socket) {
      return req.connection.socket.remoteAddress || notFound
    }
  }
  if (req.socket) {
    return req.socket.remoteAddress || notFound
  }
  return notFound
}

export function getQueryName(req) {
  if (!req.body) {
    return
  }
  // if(req.body.operationName){
  //   return req.body.operationName
  // }
  if (!req.body.query) {
    return
  }
  try {
    const parsed: any = gql(req.body.query)
    if (parsed) {
      // logger.debug('parsed:', parsed.definitions)
      const name = parsed.definitions[0].name
      if (name) {
        return name.value
      }
    }
  } catch (e) {
    logger.warn(e)
  }

  // eslint-disable-next-line no-useless-escape
  const regexp = /{\n?([^\({]+)[{\(]/i
  const result = req.body.query.match(regexp)
  if (!result) {
    logger.warn('Failed to find queryName in query')
    logger.warn('req.body.query:', req.body.query)
    return
  }
  const queryName = result[1].trim()
  const arr = queryName.split(':')
  if (arr[1]) {
    return arr[1].trim()
  }
  return queryName
}

export function currentTime() {
  return moment()
    .utc()
    .add(9, 'hours')
    .format('MM/DD HH:mm:ss')
}
