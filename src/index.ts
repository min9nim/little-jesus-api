import {ApolloServer, gql} from 'apollo-server'
import startDB from './start-db'

const typeDefs = gql`
  type Teacher {
    name: String
    students: [Student]
  }

  type Student {
    name: String
    birth: String # YYYYMMDD
  }

  type Point {
    owner: Student
    date: String # YYYYMMDD
    attendance: Boolean
    recitation: Boolean
    meditation: Int
  }

  type Query {
    students: [Student]
  }
`

const students = [
  {
    name: '이정우',
    birth: '20051011'
  },
  {
    name: '김하람',
    birth: '20050104'
  }
]

const resolvers = {
  Query: {
    students: () => students
  }
}

startDB()

const server = new ApolloServer({typeDefs, resolvers})

server.listen({port: 4040}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
