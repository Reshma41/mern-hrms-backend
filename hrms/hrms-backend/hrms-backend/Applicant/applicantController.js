
const mongoose=require('mongoose')
const applicantSchema=require('./applicantSchema')
const jwt=require('jsonwebtoken')

const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};


//Applicant Registration 

const registerApplicant=(req,res)=>{


    const applicant=new applicantSchema({
        name:req.body.name,
        age:req.body.age,
       city:req.body.city,
     
       district:req.body.district,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        qualification:req.body.qualification,
        skills:req.body.skills,
        experience:req.body.experience,
    language:req.body.language

    })
    applicant.save().then(data=>{
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
}
  
//applicant Registration -- finished

//login applicant

const login = (req, res) => {
  
  const { email, password } = req.body;

  applicantSchema.findOne({ email }).exec().then (user => {
   

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

      if (user.password!=password) {
        return res.status(500).json({ msg: 'incorrect pwd' });
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

//Login applicant --finished


//View all applicant

const viewApplicants=(req,res)=>{

  applicantSchema.find().exec()
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

// view applicant finished


//update applicant by id
const editApplicantById=(req,res)=>{


 
  applicantSchema.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{
    name:req.body.name,
    age:req.body.age,
   city:req.body.city,
 
   district:req.body.district,
    contact:req.body.contact,
    email:req.body.email,

    qualification:req.body.qualification,
    skills:req.body.skills,
    experience:req.body.experience,
language:req.body.language
   
 
    })
.exec().then(data1=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
//View  applicant by ID

const viewApplicantById=(req,res)=>{
  let emps
  applicantSchema.findOne({_id:req.params.id}).exec()
  .then(data=>{
  emps=data
    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
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

module.exports={registerApplicant,login,requireAuth,viewApplicantById,editApplicantById,viewApplicants}