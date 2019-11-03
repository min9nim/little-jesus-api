import mongoose from 'mongoose'
import registerSchema from './mongoose-schema'

export default function startDB() {
  const {NOW_GITHUB_COMMIT_REF, dburl_dev, dburl} = process.env

  const database_url = NOW_GITHUB_COMMIT_REF === 'master' ? dburl : dburl_dev
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
  console.log('mongoDB connected successfully')
})
