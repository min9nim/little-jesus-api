import {models} from 'mongoose'

export default {
  Teacher: {
    students: async ({_id}) => {
      const teacher = await models.Teachers.findOne({_id})
        .populate('students')
        .exec()
      return teacher.students
    },
  },
  Point: {
    async owner({owner}) {
      const student = await models.Students.findOne({_id: owner})
      return student
    },
  },
}
