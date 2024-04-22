const express=require('express')
const jwt = require('jsonwebtoken')
const { addExpense,deleteExpense,getExpense,updateExpense } = require('../Controllers/expenseController')
const router=express.Router()


const secretKey = 'gr54b74wb54b745v7y653in6b634tv3v7nbghgv67534qzzz@eso9p63t4et44crt54r6y4gthu7y6ijed'
function authenticateToken(request,response,next) {
 
     const authHeader=request.headers.authorization;
     const accessToken=authHeader && authHeader.split(' ')[1];
 if(accessToken){
     jwt.verify(accessToken,secretKey,(error,userDetails)=>{
         if(error){
             response.status(403).json({
                 "status":"failure",
                 "message":"access denied"
             })}
             
         else{
             next()
         }
        
     })
    }
    else{
     response.status(401).json({
         "status":"failure",
         "message":"access denied"
     })
 } 
 }
 


router.post('/new/:userId',authenticateToken, addExpense)
    router.get('/all/:userId',authenticateToken, getExpense)
    
    router.delete('/delete/:id',authenticateToken, deleteExpense)
    
    router.patch('/update/:id', authenticateToken,updateExpense)
    
    module.exports=router