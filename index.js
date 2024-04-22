const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyparser=require('body-parser')
const expressRouter=require('./Routes/expenseRoutes.js')
const userRouter=require('./Routes/userRoutes.js')
const app=express();
app.use(cors())
app.use(bodyparser.json())


app.use('/expense',expressRouter )
app.use('/user',userRouter )

async function connectToDb(){
try{
    await mongoose.connect('mongodb+srv://sreema723:yOMzH35aRx0zUuP4@expense.plkkk7q.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Expense')
    const port = process.env.PORT || 8000
    app.listen(port, function() {
        console.log(`Listening on port ${port}...`)
    })
}
catch(err){
    console.log(err)
}
}
connectToDb();

