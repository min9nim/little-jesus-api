import {models} from 'mongoose'
import {__, includes} from 'ramda'

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
      const pred: any = includes(__, teacher.students)
      result = result.filter(point => {
        return pred(point.owner)
      })
    }
    return result
  },
}
