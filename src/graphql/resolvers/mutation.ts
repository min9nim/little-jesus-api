import {models} from 'mongoose'
// import {exclude, isNil, omit} from '~/utils'     // FIXME now 환경에서 ~ 별칭을 못찾네;
import {exclude, isNil, omit} from '../../utils'
import {propEq} from 'ramda'
import createLogger from 'if-logger'

export default {
  async addStudentToTeacherByName(_, {teacherName, studentName}) {
    const student = await models.Students.findOne({name: studentName})
    if (!student) {
      throw Error('student not found')
    }
    const teacher = await models.Teachers.findOneAndUpdate(
      {name: teacherName},
      {$push: {students: student._id}},
      {new: true}
    )
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async addStudentToTeacher(_, {teacherId, studentId}) {
    const teacher = await models.Teachers.findOneAndUpdate(
      {_id: teacherId},
      {$push: {students: studentId}},
      {new: true}
    )
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
    const teacher = await models.Teachers.findOneAndUpdate(
      {name: teacherName},
      {$pull: {students: student._id}},
      {new: true}
    )
    if (!teacher) {
      throw Error('teacher not found')
    }
    return teacher
  },
  async removeStudentToTeacher(_, {teacherId, studentId}) {
    const teacher = await models.Teachers.findOneAndUpdate(
      {_id: teacherId},
      {$pull: {students: studentId}},
      {new: true}
    )
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
    const asisPoint = await models.Points.findOne({owner, date}).lean()
    if (asisPoint) {
      console.log({owner, date, asisPoint})
      throw Error('point duplicate error')
    }

    const point = await models.Points.create({owner, date, items, etc})
    return point
  },
  async checkAttendance(_, {owner, date}) {
    const logger = createLogger().addTags('checkAttendance')
    const pointMenu: any = await models.PointMenus.find({disable: false}).lean()
    const attendanceMenu = pointMenu.find(propEq('label', '출석'))
    if (!attendanceMenu) {
      throw Error('attendanceMenu is not found')
    }
    const asisPoint = await models.Points.findOne({owner, date}).exec()
    if (asisPoint) {
      const attendanceItem = asisPoint.items.find(item => {
        return item.type.toString() === attendanceMenu._id.toString()
      })
      attendanceItem.value = '출석:1'
      asisPoint.save()
      logger.verbose('asisPoint is updated')
      return asisPoint
    }

    const point = await models.Points.create({
      owner,
      date,
      // items: [
      //   {value: '출석:1', type: '5e0ed45c50898d134a59e403'},
      //   {value: '0회:0', type: '5e0ed48550898d134a59e404'},
      //   {value: '안함:0', type: '5e0ed49350898d134a59e405'},
      //   {value: '안함:0', type: '5e0ed49d50898d134a59e406'},
      //   {value: '0명:0', type: '5e0ed4bd50898d134a59e407'},
      //   {value: '안함:0', type: '5e0ed4c650898d134a59e408'},
      // ],
      etc: '',
      items: pointMenu.map(menu => {
        const typeList = menu.type.split(',')
        if (menu.label === '출석') {
          return {
            value: typeList.find(type => type.includes('출석')),
            type: menu._id.toString(),
          }
        }
        return {
          value: typeList.find(type => type.includes(menu.defaultValue)),
          type: menu._id.toString(),
        }
      }),
    })
    logger.debug('new point created')
    logger.debug('point.items=', point.items)

    return point
  },
  async createPointMenu(_, {label, type, defaultValue, priority, hidden = false, disable = false}) {
    const pointMenu = await models.PointMenus.create({
      label,
      type,
      defaultValue,
      priority,
      hidden,
      disable,
    })
    return pointMenu
  },
  async removeStudent(_, {_id}) {
    const teacher = await models.Teachers.findOneAndUpdate(
      {students: {$contains: _id}},
      {$pull: {students: _id}},
      {new: true}
    )
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
