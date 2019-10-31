import mongoose, {Schema} from 'mongoose'

const teacherSchema = new mongoose.Schema({
  name: String,
  students: [{type: Schema.Types.ObjectId, ref: 'Students'}],
});

const studentSchema = new mongoose.Schema({
  name: String,
  birth: String,    // YYYYMMDD
});

const pointSchema = new mongoose.Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'Students'},
  date: String,        // YYYYMMDD
  attendance: Boolean,
  visitcall: Boolean,
  meditation: Number,
  recitation: Boolean,
  invitation: Number,
  etc: String,
});

const pointItemSchema = new mongoose.Schema({
  label: String,
  type: String,
  disable: Boolean,
});


export default function registerSchema(){
  mongoose.model('Teachers', teacherSchema),
  mongoose.model('Students', studentSchema);
  mongoose.model('Points', pointSchema);
  mongoose.model('PointItems', pointItemSchema);
}



