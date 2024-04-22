const {User} = require('../Models/User.js')
const jwt = require('jsonwebtoken')
const secretKey = 'gr54b74wb54b745v7y653in6b634tv3v7nbghgv67534qzzz@eso9p63t4et44crt54r6y4gthu7y6ijed'

function generateToken(userDetails) {
    return jwt.sign(userDetails, secretKey)
}

async function validateUser(request, response) {
    try {
        const user = await User.find({"email": request.body.email, "password": request.body.password})
        if(user.length === 0) { 
            response.status(401).json({
                "status": "failure",
                "message": "user does not exist"
            })
        } else {
            const userDetails = {
                "username": user[0].username,
                "email": user[0].email,
                "userID": user[0]._id.toString()
            }
            const accessToken = generateToken(userDetails)
            response.status(200).json({
                "status": "success",
                "message": "user exists",
                "accessToken": accessToken,
                "userDetails":userDetails
            })
        }
    } catch(error) {
        response.status(500).json({
            "status": "failure",
            "message": "authentication failed",
            "error": error
        })
    }
}


async function createUser(request, response) {
    try {
        const user = await User.find({"email": request.body.email})
        if(user.length === 0) {
           const user= await User.create({
                "username": request.body.username,
                "email": request.body.email,
                "password": request.body.password,
               
            })

            const userDetails = {
                "username": user.username,
                "email": user.email,
                "userID": user._id.toString()
            }
            const accessToken = generateToken(userDetails)
        
            response.status(201).json({
                "status": "success",
                "message": "new user created",
                "accessToken": accessToken,
                "userDetails":userDetails
            })
        } else {
            response.status(409).json({
                "status": "failure",
                "message": "user already exist"
            })
        } 
    } catch(error) {
        response.status(500).json({
            "status": "failure",
            "message": "user not created",
            "error": error
        })
    }
}

module.exports={createUser, validateUser}