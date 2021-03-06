
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  
  name: {
    type:String,
    require: true
  },
  email: {
    type:String,
    require: true,
    
  },
  password:{
    type:String,
    require:true
  }
});


const Register = new mongoose.model("userinformation", employeeSchema);

module.exports = Register;