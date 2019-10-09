export * from './functional'

export interface IQueryParam {
  [key: string]: string
}

export function setAwait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export function esModule(_module: any) {
  return _module.default || _module
}

export function removeExt(file) {
  return file.replace(/\.(\w*)$/, '')
}

export function getFileName(path, ext = false) {
  const getFileNameRegex = /[^\\/]+\.[^\\/]+$/
  const [file = null] = path.match(getFileNameRegex) || []
  const name = file || path
  return ext ? name : removeExt(name)
}

export function nl2br(str) {
  if (!str) {
    return ''
  }
  return str.replace(/\r\n|\n/g, '<br />')
}

export function createRandomString(length = 5) {
  let text = ''
  // noinspection SpellCheckingInspection
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  Array.from(Array(length)).forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  })
  return text
}

export const getQueryParams = (url: string): IQueryParam => {
  const params = {}
  const idx = url.indexOf('?') + 1
  const fromIdx = url.slice(idx)
  // @ts-ignore
  fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  // console.log(params)
  return params
}

export const setQueryParams = paramObj => {
  const params = Object.entries(paramObj)
    .map(([key, value]) => {
      let valueStr = value
      if (Array.isArray(value)) {
        valueStr = value.join(',')
      }
      return key + '=' + valueStr
    })
    .join('&')
  window.history.pushState({}, '', '?' + params)
}

export const assignQueryParams = (url: string) => {
  return paramObj => {
    setQueryParams(Object.assign([], getQueryParams(url), paramObj))
  }
}

export function delay(fn, ms): Promise<any> {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      fn()
      resolve(timeout)
    }, ms)
  })
}

export function onlyNumber(event) {
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false
  }
}

export function numberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function address({clientPostCode, clientAddress1, clientAddress2}) {
  const postcode = clientPostCode ? '(' + clientPostCode + ') ' : ''
  const address1 = clientAddress1 || ''
  const address2 = clientAddress2 || ''
  return postcode + address1 + ' ' + address2
}

export function enableUrl(str): string {
  if (!str) {
    return ''
  }
  const isUrl = /((?:http|https?|ftps?|sftp):\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi
  if (isUrl.test(str)) {
    return str.replace(isUrl, '<a href="$1">$1</a>')
  }
  const wwwStart = /(www\.(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi
  if (wwwStart.test(str)) {
    return str.replace(wwwStart, '<a href="http://$1">$1</a>')
  }
  return str
}

export function removeTypeName(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }

  const keys = Object.keys(obj)
  keys.forEach((key: string) => {
    if (typeof obj[key] && typeof obj[key] === 'object') {
      removeTypeName(obj[key])
    }

    if (key === '__typename') {
      delete obj.__typename
    }
  })
}
