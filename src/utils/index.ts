export * from './pure'
import {assignQueryParams, peek} from './pure'

export function markError(args) {
  // 예외에 부가정보를 세팅한다
  return (e) => {
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
  return new Promise((resolve) => {
    const script: any = window.document.createElement('script')
    const load = () => {
      if(!script.readyState || /loaded|complete/.test(script.readyState)){
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

export const appendQueryParams = (paramObj) => {
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
