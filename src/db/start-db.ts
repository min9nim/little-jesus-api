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
  if(process.env.NOW_GITHUB_COMMIT_REF === 'master'){
    console.log('\x1b[33m%s\x1b[0m', 'PRODUCTION', 'mongoDB connected successfully')
  }else{
    console.log('dev mongoDB connected successfully')
  }
})
