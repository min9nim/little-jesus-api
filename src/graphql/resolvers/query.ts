import {models} from 'mongoose'

export default {
  async students(){
    const students = await models.Students.find({})
    return students
  },
  async teachers(){
    const teachers = await models.Teachers.find({}).populate({path: 'students', model: 'Students'}).exec()
    return teachers
  }
}