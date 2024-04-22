const {Expense} = require('../Models/Expense.js')

function addExpense(req,res){
    try{
        Expense.create({
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date,
            "userId": req.params.userId,
        })
        res.status(201).json({
            "status":"success",
            "message":"entry created",
        })
    }
    catch(err){
        res.status(500).json({
            "status":"success",
            "message":"entry not created",
            "error":err
        })
    }
    }


    async function getExpense(request, response) {
        try {
            const expenseDetails = await Expense.find({"userId":request.params.userId})
            response.status(200).json(expenseDetails)
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "could not fetch data",
                "error" : error
            })
        }
    }


    async function deleteExpense(request, response) {
        try {
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "entry deleted"
            })
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "couldn\'t delete entry",
                "error" : error
            })
        }
    }


    async function updateExpense(request, response) {
        try {
            await Expense.findByIdAndUpdate(request.params.id, {
                "amount": request.body.amount,
                "category": request.body.category,
                "date": request.body.date,
                "userId": request.params.userId
            })
            response.status(200).json({
                "status" : "success",
                "message" : "entry updated"
            })
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "couldn\'t update entry",
                "error" : error
            })
        }
    }


    


    module.exports={addExpense,deleteExpense,getExpense,updateExpense}