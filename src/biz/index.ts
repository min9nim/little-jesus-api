import {includes, find, pipe, prop, filter, append, concat} from "ramda"
import {exclude, flatLog} from '@mgsong/min-utils'

// const asis = {
//   "_id": "5ddc13c6c1f75b0b6b5e1b27",
//   "owner": {
//     "_id": "5dbcce4501075e5bcc98c681",
//     "name": "김성진",
//     "teacher": {
//       "_id": "5dbd44d56c185775b955ffa8",
//       "name": "신의"
//     }
//   },
//   "date": "20191124",
//   "attendance": true,
//   "meditation": 0,
//   "invitation": 0,
//   "visitcall": false,
//   "recitation": false,
//   "etc": ""
// }


export function buildItemsField(pointMenus){
  return (point) => {
    // flatLog({point})
    let result = point
    if(!point.items){
      result.items = []
      return result
    }
    // if(point.items! || point.items.length === 0){
    //   // 옛날 데이터인 경우 보정
    //   result = {...point, items: [
    //     {
    //       type: '5dd2f8abef21600f31538547',
    //       value: point.attendance ? 1 : 0,
    //     },
    //     {
    //       type: '5dd2f9ffcded1c10b89e3ce2',
    //       value: point.visitcall ? 1 : 0,
    //     },
    //     {
    //       type: '5dd2fb28602a3211f5543d82',
    //       value: point.invitation || 0,
    //     },
    //     {
    //       type: '5dd2fb36602a3211f5543d83',
    //       value: point.meditation || 0,
    //     },
    //     {
    //       type: '5dd2fb5d602a3211f5543d84',
    //       value: point.recitation ? 1 : 0,
    //     },
    //   ]}
    // }

    // flatLog('xxxx 3333', result.items[0])

    // result.items.forEach(item => {
    //   if(!item.type){
    //     console.log('xxx222', item)
    //   }
    // })

    // 1. pointMenus 에 포함된 항목들만 남기기
    // const isLatestItem = (itemId) => find((menu: any) => menu._id === itemId)(pointMenus)
    // console.log({pointMenus})
    result.items = filter((item: any) => {
      const result = find((menu: any) => {
        // console.log(123, typeof menu._id, typeof item.type, menu._id.toString() === item.type.toString())
        return menu._id.toString() === item.type.toString()
      })(pointMenus)

      return result
    })(result.items)


    // result.items.forEach(item => {
    //   if(!item.type){
    //     console.log('xxx666', item)
    //   }
    // })

    // flatLog('xxxx 777', result.items[0])

    // 2. result 에 없는 항목 기본값으로 추가
    // 2.1 빠진 항목들 찾기
    const newMenus = exclude(menu => {
      return find((item: any) => item.type._id.toString() === menu._id.toString())(result.items)
    })(pointMenus)
    // 2.2 빠진 항목들 추가
    result.items = concat(result.items, newMenus.map(menu => ({type: menu._id, value: 0})))

    // result.items.forEach(item => {
    //   if(!item.type){
    //     console.log(666, item)
    //   }
    // })


    // flatLog('xxxx 9999', result.items[0])

    return result
  }
}