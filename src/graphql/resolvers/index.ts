import Query from './query'
import Mutation from './mutation'
import {models} from 'mongoose'

export default {
  Query,
  Mutation,
  Teacher: {
    students: async ({_id}) => {
      const teacher = await models.Teachers.findOne({_id}).populate('students').exec()
      return teacher.students
    }
  }
}
