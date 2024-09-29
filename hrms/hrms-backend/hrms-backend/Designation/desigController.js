const desig=require('./desigSchema')
const mongoose=require('mongoose')
//Desig Registration
const addDesig=(req,res)=>{
    const newdesig=new desig({
        title:req.body.title,
        bp:req.body.bp,
        leaves:req.body.leave
       
    })
    newdesig.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
//Desig Registration -- finished

// view all designations
const viewAllDesigs=(req,res)=>{
    let desigs=[]
desig.find().then(data=>{
    console.log(data);
    for(let i=0;i<data.length;i++)
        desigs.push(data[i].title)
    console.log(desigs);
    res.json({
        status:200,
        data:desigs
    })
}).catch(err=>{
    res.json({
        status:500,
        msg:"no data",
        Error:err
    })
})
}

// Update designation
const editDesigById=(req,res)=>{

   
   
   
    desig.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.body.id)},{
        title:req.body.title,
        bp:req.body.bp,
        leaves:req.body.leave
   
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




//finished view


// remove Designation
const delDesig=(req,res)=>{
    desig.findByIdAndDelete({_id:mongoose.Types.ObjectId(req.body.id)})
    .exec().then(data=>{
        res.json({
            status:200,
            msg:"Removed successfully"
        })
      }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Removed",
            Error:err
        })
      })
      }
// finished

module.exports={addDesig,viewAllDesigs,editDesigById,delDesig}