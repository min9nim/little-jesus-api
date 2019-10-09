import mongoose, {Schema} from 'mongoose'

const teacherSchema = new mongoose.Schema({
  name: String,
  students: [String],
});

const studentSchema = new mongoose.Schema({
  name: String,
  birth: String,    // YYYYMMDD
});


const pointSchema = new mongoose.Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'Students'},
  date: String,        // YYYYMMDD
  attendance: Boolean,
  recitation: Boolean,
  meditation: Number,
});


export default function registerSchema(){
  mongoose.model('Teachers', teacherSchema),
  mongoose.model('Students', studentSchema);
  mongoose.model('Points', pointSchema);  
}



