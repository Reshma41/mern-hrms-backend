const mongoose= require("mongoose");

const applicantSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
 
        dropDups: true
    },
    age:{
        type:Number,
        required:true
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
    },qualification:{
        type:String,
        required:true
    },
    skills:{
        type:Array
    },
    language:{
        type:Array
    },
    experience:{
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('applicants',applicantSchema)