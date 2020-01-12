import {find, filter, concat} from "ramda"
import {exclude, flatLog} from 'mingutils'
import mongoose from 'mongoose'

export function buildItemsField(pointMenus){
  return (point) => {
    // flatLog({point})
    let result = point
    if(!point.items){
      result.items = []
    }
    if(!point.items || point.items.length === 0){
      // 옛날 데이터인 경우 보정
      result = asis2tobe(point)
    }

    // console.log('필터링 전 ', result)


    // 1. pointMenus 에 포함된 항목들만 남기기
    result.items = filter((item: any) => {
      const result = find((menu: any) => {
        // console.log(123, typeof menu._id, typeof item.type, menu._id.toString() === item.type.toString())
        return menu._id.toString() === item.type.toString()
      })(pointMenus)

      return result
    })(result.items)

    // console.log('result.items = ', result.items)

    // 2. result 에 없는 항목 기본값으로 추가
    // 2.1 빠진 항목들 찾기
    const newMenus = exclude(menu => {
      return find((item: any) => item.type._id.toString() === menu._id.toString())(result.items)
    })(pointMenus)
    // 2.2 빠진 항목들 추가
    // console.log('newMenus = ', newMenus)
    result.items = concat(result.items, newMenus.map(menu => ({type: menu._id, value: 0})))

    return result
  }
}

function asis2tobe(point){
  return {...point, items: [
    {
      type: mongoose.Types.ObjectId('5deb559371cdb39e405a5689'),
      value: point.attendance ? 1 : 0,
    },
    {
      type: mongoose.Types.ObjectId('5deb8624b94408a89a1236cd'),
      value: point.visitcall ? 1 : 0,
    },
    {
      type: mongoose.Types.ObjectId('5deb8897b94408a89a1236d0'),
      value: point.invitation || 0,
    },
    {
      type: mongoose.Types.ObjectId('5deb887eb94408a89a1236ce'),
      value: point.meditation || 0,
    },
    {
      type: mongoose.Types.ObjectId('5deb888ab94408a89a1236cf'),
      value: point.recitation ? 1 : 0,
    },
  ]}
}