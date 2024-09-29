const mongoose= require("mongoose");

const desigSchema=mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
 
        dropDups: true
    },
    bp:{
        type:Number,
        required:true
    },
    
    leaves:{
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('designations',desigSchema)

