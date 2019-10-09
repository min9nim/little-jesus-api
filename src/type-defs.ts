import {gql} from 'apollo-server'

export default gql`
  "Mongo object id scalar type"
  scalar ObjectId

  "The javascript 'Date' as string. Type represents date and time as the ISO Date string."
  scalar DateTime

  type Teacher {
    _id: ObjectId!
    name: String
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
  }

  type Mutation {
    addStudent(name: String!, birth: String): Student
    deleteStudent(_id: ObjectId!): Student
  }
`
