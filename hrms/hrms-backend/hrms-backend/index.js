const express=require('express')
const bodyParser=require('body-parser')
const db=require('./DBConnection')
const app=express()
const cors=require('cors')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())
const route=require('./routes')
app.use('/',route)

app.listen(4000,()=>{
    console.log("Server created successfully");
})