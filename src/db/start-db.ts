import mongoose from 'mongoose'
import dburl from '../../db-info'
import registerSchema from './mongoose-schema'


export default function startDB(){
  registerSchema()
  mongoose.connect(dburl, {useNewUrlParser: true});
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function() {
  console.log('mongoDB connected successfully')
});