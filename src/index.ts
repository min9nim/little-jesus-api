import {ApolloServer} from 'apollo-server'
import startDB from './db/start-db'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/type-defs'
import createLogger from 'if-logger'
import {getClientIp, currentTime, getQueryName} from './utils'

const logger = createLogger({tags: [currentTime]})

startDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'service:little-jesus:zan-VlnnwRKLKLMIjFa19A',
  },
  context: ({req, res}) => {
    const logger = createLogger({
      tags: [currentTime, getClientIp(req), getQueryName(req)],
    })
    logger.verbose("Client's context initialized")
    if (res) {
      logger.verbose.time('response time:')
      res.on('finish', () => {
        logger.verbose.timeEnd('response time:')
      })
    }
  },
  introspection: true,
  playground: true,
  tracing: true,
})
const port = process.env.PORT || 5050
server.listen({port}).then(({url}) => {
  logger.info(`🚀  Server ready at ${url}`)
})
