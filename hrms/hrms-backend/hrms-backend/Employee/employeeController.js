const mongoose=require('mongoose')
const emp=require('./employeeSchema')
const jwt=require('jsonwebtoken')
const designationschema=require('../Designation/desigSchema')
const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};


//Emp Registration 

const registerEmp=(req,res)=>{

  let desigid;
let desig=req.body.designation
if(!desig){
  res.json({
    status:500,
    msg:"Please enter your designation",
    
})
}else{
designationschema.findOne({title:desig}).then(data=>{


console.log(data._id);
    const newEmp=new emp({
        name:req.body.name,
        age:req.body.age,
       city:req.body.city,
       pincode:req.body.pincode,
       district:req.body.district,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        dateofjoin:req.body.dateofjoin,
        designationid:data._id
    })
    newEmp.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
      if((err.code)==11000){
      res.json({
        status:500,
        msg:"Mail id already registered with us. Please try to Log in",
        Error:err
    })
  }
    else{
     
        res.json({
            status:500,
            msg:"Please enter all the mandatory fields",
            Error:err
        })
      }
    })
  })
}
}
//Emp Registration -- finished

//login employee

const login = (req, res) => {
  const { email, password } = req.body;

  emp.findOne({ email }).populate('designationid').exec().then (user => {
   

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

      if (user.password!=password) {
        return res.status(500).json({ msg: 'Something went wrong' });
      }

    
      const token = createToken(user);

      res.status(200).json({ user, token });
    })
    .catch(err=>{
      
        return res.status(500).json({ msg: 'Something went wrong' });
      
    })
  
};
//validate


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1",token);
  console.log("secret",secret);
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: 'Unauthorized' ,err:err});
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: 'ok' ,user:decodedToken.userId});
  });
  console.log(req.user);
};

//Login Emp --finished


//View all Emp

const viewEmps=(req,res)=>{
  let emps=[]
  emp.find().populate('designationid').exec()
  .then(data=>{
    emps=data
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

// view donors finished


//update donor by id
const editEmpById=(req,res)=>{

  // let desigid;
  // let emp;
 
 
  emp.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.body._id)},{
    name:req.body.name,
    age:req.body.age,
   city:req.body.city,
   pincode:req.body.pincode,
   district:req.body.district,
    contact:req.body.contact,
    email:req.body.email,
    gender:req.body.gender
   
 
    })
.exec().then(data1=>{
  res.json({
      status:200,
      msg:"Updated successfully",data:data1
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
//View  Emp by ID

const viewEmpById=(req,res)=>{
  
  emp.findOne({_id:req.params.id}).populate('designationid').exec()
  .then(data=>{
  
    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data,
        desig:data.designationid.title
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

module.exports={registerEmp,login,requireAuth,viewEmps,editEmpById,viewEmpById}