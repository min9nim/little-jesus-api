import {gql} from 'apollo-server'

export default gql`
  "Mongo object id scalar type"
  scalar ObjectId

  "The javascript 'Date' as string. Type represents date and time as the ISO Date string."
  scalar DateTime

  type Teacher {
    _id: ObjectId!
    name: String!
    students: [Student]
  }

  type Student {
    _id: ObjectId!
    name: String!
    birth: String # YYYYMMDD
    teacher: Teacher
  }

  type Point {
    _id: ObjectId!
    owner: Student
    date: String # YYYYMMDD
    attendance: Boolean
    visitcall: Boolean
    meditation: Int
    recitation: Boolean
    invitation: Int
    items: [PointItem]
    etc: String
  }

  type PointItem {
    type: PointMenu!
    value: Int!
  }

  type PointMenu {
    _id: ObjectId!
    label: String
    type: String
    priority: Int
    hidden: Boolean
    disable: Boolean
  }

  type Query {
    students: [Student]
    teachers: [Teacher]
    points(teacherId: ObjectId date: String): [Point]
    # pointsByTeacherName(teacherName: name!): [Point]
    pointMenus: [PointMenu]
  }

  input PointItemArg {
    type: ObjectId!
    value: Int!
  }

  type Mutation {
    addStudentToTeacherByName(teacherName: String!, studentName: String!): Teacher
    addStudentToTeacher(teacherId: ObjectId!, studentId: ObjectId!): Teacher
    removeStudentToTeacherByName(teacherName: String!, studentName: String!): Teacher
    removeStudentToTeacher(teacherId: ObjectId!, studentId: ObjectId!): Teacher
    createTeacher(name: String!): Teacher
    removeTeacher(_id: ObjectId!): Teacher
    createStudent(name: String!, birth: String): Student
    createPoint(
      owner: ObjectId!
      date: String!
      items: [PointItemArg!]!
      etc: String
    ): Point
    createPointMenu(
      label: String!
      type: String
      priority: Int
      hidden: Boolean
    ): PointMenu
    removePoint(_id: ObjectId!): Point
    removePointMenu(
      _id: ObjectId!
    ): PointMenu
    removeStudent(_id: ObjectId!): Student
    removeStudentByName(name: String!): Student
    updateStudent(_id: ObjectId!, name: String, birth: String): Student
    updateTeacher(_id: ObjectId!, name: String, students: [ObjectId]): Teacher
    updatePoint(
      _id: ObjectId!
      owner: ObjectId
      date: String
      attendance: Boolean
      visitcall: Boolean
      meditation: Int
      recitation: Boolean
      invitation: Int
      etc: String
    ): Point
    updatePointMenu(
      _id: ObjectId!
      label: String
      type: String
      priority: Int
      hidden: Boolean
      disable: Boolean
    ): PointMenu
  }
`
