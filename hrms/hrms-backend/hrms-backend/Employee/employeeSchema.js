const mongoose= require("mongoose");

const EmpSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    designationid:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'designations'
    },
    contact:{
        type:Number,
        required:true
    },
  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateofjoin:{
        type:Date,
        required:true
    }

});
module.exports=mongoose.model('employees',EmpSchema)

