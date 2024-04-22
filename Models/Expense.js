const mongoose=require('mongoose')

const expenseDataSchema= new mongoose.Schema({
amount:{
    type:Number
},
category:{
    type:String
},
data:{
    type:String
},
userId:{
    type:String
}

},{versionKey:false})
const Expense= mongoose.model('ExpenseDetails', expenseDataSchema)
module.exports={Expense}