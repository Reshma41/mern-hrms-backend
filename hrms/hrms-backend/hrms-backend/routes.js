

const express=require('express')
const router=express.Router()
const employee=require('./Employee/employeeController')
const desig=require('./Designation/desigController')
const appnt=require('./Applicant/applicantController')

//employee routes
router.post('/registerEmployee',employee.registerEmp)
router.post('/loginEmployee',employee.login)
router.post('/viewEmployees',employee.viewEmps)
router.post('/editEmployeeById',employee.editEmpById)
router.post('/viewEmployeeById',employee.viewEmpById)


//designations
router.post('/addDesignation',desig.addDesig)
router.post("/viewAllDesginayions",desig.viewAllDesigs)
router.post("/editDesignationById",desig.editDesigById)
router.post("/deleteDesignationById",desig.delDesig)


//applicants
router.post('/registerApplicant',appnt.registerApplicant)
router.post('/loginApplicant',appnt.login)
router.post('/viewApplicants',appnt.viewApplicants)
router.post('/editApplicantById/:id',appnt.editApplicantById)
router.post('/viewApplicantById/:id',appnt.viewApplicantById)
module.exports=router