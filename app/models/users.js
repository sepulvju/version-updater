const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  password:{
    type:String,
    required:true
  },
  mail:{
    type:String,
    required:true
  },
  username:{
    type: String,
    unique: true,
    required: true,
    index:true
  },
  lastname:{
    type:String,
    required:true
  },
  firstname:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('User', userSchema);
