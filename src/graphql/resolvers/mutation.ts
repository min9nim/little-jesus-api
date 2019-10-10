import {models} from 'mongoose'
import {exclude, isNil, omit} from '~/utils'

export default {
  async addStudentToTeacher(_, {teacherName, studentName}) {
    const student = await models.Students.findOne({name: studentName})
    if (!student) {
      throw Error('student not found')
    }
    const teacher = await models.Teachers.findOneAndUpdate({name: teacherName}, {$push: {students: student._id}}, {new: true})
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async createTeacher(_, {name}) {
    const teacher = await models.Teachers.create({name, students: []})
    return teacher
  },
  async createStudent(_, {name, birth}) {
    const student = await models.Students.create({
      name,
      birth,
    })
    return student
  },
  async createPoint(_, {owner, date, attendance, recitation, meditation}) {
    const point = await models.Points.create({owner, date, attendance, recitation, meditation})
    return point
  },
  async removeStudent(_, {_id}) {
    const student = await models.Students.findOneAndRemove({_id})
    return student
  },
  async removePoint(_, {_id}) {
    const point = await models.Points.findOneAndRemove({_id})
    return point
  },
  async updateStudent(_, args) {
    const tobe = exclude(isNil)(omit(['_id'], args))
    const student = await models.Students.findOneAndUpdate({_id: args._id}, tobe, {new: true})
    return student
  },
  async updateTeacher(_, args) {
    const tobe = exclude(isNil)(omit(['_id'], args))
    const teacher = await models.Teachers.findOneAndUpdate({_id: args._id}, tobe, {new: true})
    return teacher
  },
  async updatePoint(_, args) {
    const tobe = exclude(isNil)(omit(['_id'], args))
    const point = await models.Points.findOneAndUpdate({_id: args._id}, tobe, {new: true})
    return point
  },
}
