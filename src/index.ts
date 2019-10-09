import {ApolloServer} from 'apollo-server'
import startDB from './db/start-db'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/type-defs'

startDB()

const server = new ApolloServer({typeDefs, resolvers})

server.listen({port: 4040}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
