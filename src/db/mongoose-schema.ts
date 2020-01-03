import mongoose, {Schema} from 'mongoose'

const classSchema = new mongoose.Schema({
  year: String,
  teacher: {type: Schema.Types.ObjectId, ref: 'Teachers'},
  students: [{type: Schema.Types.ObjectId, ref: 'Students'}],
})

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
  items: [{
    type: {type: Schema.Types.ObjectId, ref: 'PointItems'},
    value: String,
  }],
  etc: String,
});

const pointMenuSchema = new mongoose.Schema({
  label: String,
  type: String,
  defaultValue: String,
  priority: Number,
  hidden: Boolean,
  disable: Boolean,
});

export default function registerSchema(){
  mongoose.model('Classes', classSchema),
  mongoose.model('Teachers', teacherSchema),
  mongoose.model('Students', studentSchema);
  mongoose.model('Points', pointSchema);
  mongoose.model('PointMenus', pointMenuSchema);
}



