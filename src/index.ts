import {ApolloServer, gql} from 'apollo-server'
import startDB from './start-db'
import {models} from 'mongoose'

const typeDefs = gql`
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
  }
`

const resolvers = {
  Query: {
    students: async () => {
      const students = await models.Students.find({})
      return students
    }
  },
  Mutation: {
    addStudent: async (_, {name, birth}) => {
      const student = await models.Students.create({
        name,
        birth
      })
      return student
    }
  }
}

startDB()

const server = new ApolloServer({typeDefs, resolvers})

server.listen({port: 4040}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
