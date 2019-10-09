import {models} from 'mongoose'

export default {
  addStudent: async (_, {name, birth}) => {
    const student = await models.Students.create({
      name,
      birth
    })
    return student
  },
  deleteStudent: async (_, {_id}) => {
    const student = await models.Students.findOneAndRemove({_id})
    return student
  }
}