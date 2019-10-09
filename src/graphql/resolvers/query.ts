import {models} from 'mongoose'

export default {
  students: async () => {
    const students = await models.Students.find({})
    return students
  }
}