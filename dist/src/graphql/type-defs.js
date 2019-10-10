"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
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
  }

  type Point {
    _id: ObjectId!
    owner: Student
    date: String # YYYYMMDD
    attendance: Boolean
    recitation: Boolean
    meditation: Int
  }

  type Query {
    students: [Student]
    teachers: [Teacher]
    points: [Point]
  }

  type Mutation {
    addStudentToTeacher(teacherName: String!, studentName: String!): Teacher
    createTeacher(name: String!): Teacher
    createStudent(name: String!, birth: String): Student
    createPoint(owner: ObjectId!, date: String!, attendance: Boolean, recitation: Boolean, meditation: Int): Point
    removePoint(_id: ObjectId!): Point
    removeStudent(_id: ObjectId!): Student
    updateStudent(_id: ObjectId!, name: String, birth: String): Student
    updateTeacher(_id: ObjectId!, name: String, students: [ObjectId]): Teacher
    updatePoint(_id: ObjectId!, owner: ObjectId, date: String, attendance: Boolean, recitation: Boolean, meditation: Int): Point
  }
`;
//# sourceMappingURL=type-defs.js.map