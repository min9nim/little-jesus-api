import {ApolloServer} from 'apollo-server'
import startDB from './db/start-db'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/type-defs'

startDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  tracing: true,
})
const port = process.env.PORT || 5050
server.listen({port}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
