import mongoose from 'mongoose'
import registerSchema from './mongoose-schema'
import createLogger from 'if-logger'
const logger = createLogger().addTags('start-db.ts')

export default function startDB() {
  const {NOW_GITHUB_COMMIT_REF, dburl_dev, dburl, dburl_2020} = process.env
  logger.debug('xxx', {NOW_GITHUB_COMMIT_REF, dburl_dev, dburl, dburl_2020})

  let database_url = dburl_dev
  logger.info('NOW_GITHUB_COMMIT_REF = ' + NOW_GITHUB_COMMIT_REF)
  if (NOW_GITHUB_COMMIT_REF === 'lj2019') {
    database_url = dburl
  }
  if (['lj2020', 'master', 'main'].includes(NOW_GITHUB_COMMIT_REF || '')) {
    database_url = dburl_2020
  }
  logger.info('database_url = ' + database_url)
  if (!database_url) {
    throw Error('database_url is not defined')
  }
  registerSchema()
  mongoose.connect(
    database_url,
    {useNewUrlParser: true}
  )
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB connection error:'))
db.once('open', function() {
  if (process.env.NOW_GITHUB_COMMIT_REF !== 'develop') {
    logger.verbose('dev mongoDB connected successfully')
  } else {
    logger.info(
      '\x1b[33m%s\x1b[0m',
      'PRODUCTION-' + process.env.NOW_GITHUB_COMMIT_REF,
      'mongoDB connected successfully'
    )
  }
})
