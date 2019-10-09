import * as R from 'ramda'

export const {
  any,
  assoc,
  always,
  and,
  or,
  propOr,
  assocPath,
  forEach: each,
  map,
  reduce,
  pipe,
  split,
  equals,
  join,
  concat,
  complement,
  uniq,
  find,
  difference,
  differenceWith,
  findIndex,
  propEq,
  propSatisfies,
  pathEq,
  pathSatisfies,
  clone,
  eqProps,
  filter,
  identity,
  isNil,
  flip,
  ifElse,
  empty,
  pick,
  mergeLeft,
  mergeRight,
  mergeAll,
  not,
  omit,
  curry,
  set,
  over,
  includes,
  head,
  last,
  update,
  adjust,
  insert,
  remove,
  without,
  trim,
  append,
  prepend,
  T,
  F,
  nth,
  contains,
  evolve,
  prop,
  path,
  props,
  lensProp,
  lensPath,
  dropLast,
  view,
  __,
  addIndex,
} = R

export const overWrite = mergeLeft
export const _ = __
export const overWithObject = curry((lens, overWithObject, object) => set(lens, overWithObject(object), object))

// export function exclude(predi){
//   return filter(complement(predi))
// }

export const OR = (pred1, pred2) => {
  return (value) => or(pred1(value), pred2(value))
}

export function AND(pred1, pred2){
  return (value) => and(pred1(value), pred2(value))
}

export const exclude = pipe<any, any, any>(complement, filter)

export const isNotNil = complement(isNil)

export function merge(...args){
  return Object.assign({}, ...args)
}

export function wrapWith(wrapper) {
  return (str) => {
    if(!str){
      return ''
    }
    return wrapper + str + wrapper
  }
}

export function tag(tagName, className?: string) {
  return (str) => {
    if(!str){
      return str
    }
    let classStr = ''
    if(className){
      classStr = ` class="${className}"`
    }
    return `<${tagName}${classStr}>${str}</${tagName}>`
  }
}

export const HIGHLIGHT_DELIMETER = ' '
export const highlight = (word: string) => {
  return (str) => {
    if(!word){
      return str
    }
    const regStr = word
      .split(HIGHLIGHT_DELIMETER)
      .filter((word) => word !== '')
      .join('|')
    const reg = new RegExp(`(${regStr})`, 'gi')
    return str.replace(reg, '<mark>$1</mark>')
  }
}

export function intervalCall(interval = 1000) {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true
  return (fn) => {
    // console.log('call')
    if(!elapsed){
      // console.log('무시됨')
      return // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false
    fn()
    setTimeout(() => {
      elapsed = true
    }, interval)
  }
}

export const slice = (list: any[] | number, begin?: number, end?: number) => {
  if(typeof list === 'number'){
    let begin = list
    let end = begin
    return (list) => Array.prototype.slice.call(list, begin, end)
  }
  return list.slice(begin, end)
}

export function removeTag(html) {
  if(html === undefined){
    return ''
  }
  return html.replace(/(<([^>]+)>)/gi, '')
}

export function peek(...args) {
  return (value) => {
    // console.log('peek called')
    console.log(...args, value) // eslint-disable-line
    return value
  }
}

export function go(...args) {
  // @ts-ignore
  return pipe(...args.slice(1))(args[0])
}

export function constant(value){
  return () => value
}

export const cnst = constant
export const noop = () => {}      // eslint-disable-line

// export const indexMap = addIndex<any>(map)
export const indexMap = (...args) => {
  if(args.length === 1){
    return (list: any[]) => {
      Array.prototype.map.call(list, args[0])
    }
  }
  return Array.prototype.map.call(args[1], args[0])
}
