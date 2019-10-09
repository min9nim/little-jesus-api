import {ApolloServer} from 'apollo-server'
import startDB from './start-db'
import resolvers from './resolvers'
import typeDefs from './type-defs'

startDB()

const server = new ApolloServer({typeDefs, resolvers})

server.listen({port: 4040}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
