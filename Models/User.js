const mongoose=require('mongoose')


const userDetails= new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    
    },{versionKey:false})
const User= mongoose.model('userDetails', userDetails)

module.exports={User}