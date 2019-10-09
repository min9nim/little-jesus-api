import {models} from 'mongoose'

export default {
  async addStudent(_, {name, birth}) {
    const student = await models.Students.create({
      name,
      birth
    })
    return student
  },
  async deleteStudent(_, {_id}) {
    const student = await models.Students.findOneAndRemove({_id})
    return student
  },
  async modifyStudent(_, {_id, name, birth}){
    const student = await models.Students.findOneAndUpdate({_id}, {name, birth})
    return student
  }
}
