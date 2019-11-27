import {models} from 'mongoose'
import {__, includes, pipe, prop} from 'ramda'

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
    let condition = {}
    if(date){
      Object.assign(condition, {date})
    }
    let result = await models.Points.find(condition)
    if(teacherId){
      const teacher = await models.Teachers.findOne({_id: teacherId})
      if(!teacher){
        console.warn(`Not found teacher[${teacherId}]`)
        return []
      }
      const pred: any = pipe<any, string, boolean>(prop('owner'), includes(__, teacher.students) as any)
      result = result.filter(pred)
    }
    return result
  },
  async pointMenus() {
    const pointMenus = await models.PointMenus.find({disable: false})
    return pointMenus
  },
}
