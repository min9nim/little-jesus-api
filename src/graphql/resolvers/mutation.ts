import {models} from 'mongoose'
// import {exclude, isNil, omit} from '~/utils'     // FIXME now 환경에서 ~ 별칭을 못찾네;
import {exclude, isNil, omit} from '../../utils'

export default {
  async addStudentToTeacherByName(_, {teacherName, studentName}) {
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
  async addStudentToTeacher(_, {teacherId, studentId}) {
    const teacher = await models.Teachers.findOneAndUpdate({_id: teacherId}, {$push: {students: studentId}}, {new: true})
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async removeStudentToTeacherByName(_, {teacherName, studentName}) {
    const student = await models.Students.findOne({name: studentName})
    if (!student) {
      throw Error('student not found')
    }
    const teacher = await models.Teachers.findOneAndUpdate({name: teacherName}, {$pull: {students: student._id}}, {new: true})
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async removeStudentToTeacher(_, {teacherId, studentId}) {
    const teacher = await models.Teachers.findOneAndUpdate({_id: teacherId}, {$pull: {students: studentId}}, {new: true})
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async createTeacher(_, {name}) {
    const teacher = await models.Teachers.create({name, students: []})
    return teacher
  },
  async removeTeacher(_, {_id}) {
    const teacher = await models.Teachers.findOneAndRemove({_id})
    return teacher
  },
  async removePointMenu(_, {_id}) {
    const pointMenu = await models.PointMenus.findOneAndRemove({_id})
    return pointMenu
  },
  async createStudent(_, {name, birth}) {
    const student = await models.Students.create({
      name,
      birth,
    })
    return student
  },
  async createPoint(_, {owner, date, items, etc}) {
    const point = await models.Points.create({owner, date, items, etc})
    return point
  },
  async createPointMenu(_, {label, type, priority, hidden = false, disable = false}) {
    const pointMenu = await models.PointMenus.create({label, type, priority, hidden, disable})
    return pointMenu
  },
  async removeStudent(_, {_id}) {
    const teacher = await models.Teachers.findOneAndUpdate({students: { $contains : _id }}, {$pull: {students: _id}}, {new: true})
    if (!teacher) {
      console.log('Teacher is not found')
    }
    const student = await models.Students.findOneAndRemove({_id})
    return student
  },
  async removeStudentByName(_, {name}) {
    const student = await models.Students.findOneAndRemove({name})
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
  async updatePointMenu(_, args) {
    const tobe = exclude(isNil)(omit(['_id'], args))
    const pointMenu = await models.PointMenus.findOneAndUpdate({_id: args._id}, tobe, {new: true})
    return pointMenu
  },
}
