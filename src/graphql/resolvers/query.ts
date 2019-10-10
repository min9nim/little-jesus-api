import {models} from 'mongoose'

export default {
  async students() {
    const students = await models.Students.find({})
    return students
  },
  async teachers() {
    const teachers = await models.Teachers.find({})
    return teachers
  },
  async points() {
    const result = await models.Points.find({})
    return result
  },
}
