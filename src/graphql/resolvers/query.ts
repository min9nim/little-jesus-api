import {models} from 'mongoose'
import {__, includes, pipe, prop} from 'ramda'
import {buildItemsField} from '../../biz'
import {flatLog} from '@mgsong/min-utils'

export default {
  async students() {
    const students = await models.Students.find({})
    return students
  },
  async teachers() {
    const teachers = await models.Teachers.find({})
    return teachers
  },
  async points(_, {teacherId, date}){
    // let condition = {hidden: false}
    let condition = {}
    if(date){
      Object.assign(condition, {date})
    }
    let result = await models.Points.find(condition).lean()
    if(teacherId){
      const teacher = await models.Teachers.findOne({_id: teacherId})
      if(!teacher){
        console.warn(`Not found teacher[${teacherId}]`)
        return []
      }
      const pred: any = pipe<any, string, boolean>(prop('owner'), includes(__, teacher.students) as any)
      result = result.filter(pred)
    }
    const pointMenus = await models.PointMenus.find({disable: false, hidden: false}).lean()
    // console.log({pointMenus})
    const buildItems = buildItemsField(pointMenus)
    return result.map(buildItems)
  },
  async pointMenus(_, {hidden}) {
    let condition = {disable: false}
    if(hidden !== undefined){
      Object.assign(condition, {hidden})
    }
    const pointMenus = await models.PointMenus.find(condition)
    return pointMenus
  },
}
