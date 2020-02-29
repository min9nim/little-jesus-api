import {ApolloServer} from 'apollo-server'
import startDB from './db/start-db'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/type-defs'
import createLogger from 'if-logger'
import {getClientIp} from './utils'
import {prop} from 'ramda'

startDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'service:little-jesus:zan-VlnnwRKLKLMIjFa19A',
  },
  context: ({req, res}) => {
    const queryName = prop('operationName', req.body)
    const logger = createLogger({tags: [getClientIp(req), queryName]})
    if (queryName !== 'IntrospectionQuery') {
      logger.verbose(req.body.query, req.body.variables)
    }
  },
  introspection: true,
  playground: true,
  tracing: true,
})
const port = process.env.PORT || 5050
server.listen({port}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`)
})
