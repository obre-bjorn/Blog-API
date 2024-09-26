const bcrypt = require('bcryptjs')
const userQueries = require('../db/userQueries')
const jwt  = require('jsonwebtoken')



require('dotenv').config()

//TODO: To validate user 

const registerUser = async (req,res) =>{

    try {

        req.body.password = await bcrypt.hash(req.body.password,10)

        const user = await userQueries.createUser(req.body)


        res.status(200).json({
            msg: "User Created",
            user: user
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Something went wrong"
    })
        
    }
    
}


const loginUser = async (req,res) =>{

    const {username, password } = req.body


    try { 

        const user = await userQueries.findUserByUsername(username)
    
        if(!username){
    
            return res.status(400).json({
                msg: "User not found"
            })
    
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password)
    
        if(!passwordMatch){
            
            return res.status(400).json({
                msg: "Password does not match"
            })
        }
    
        const payload = {id : user.id, username: user.password}
    
        const token = await new Promise((resolve,reject) => {
            
            jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: 3600},(err,token) => {
    
                if(err) reject(err)
    
                resolve(token)
            })
            
        } )
    
        res.status(200).json({
            success : true,
            token : 'Bearer ' + token
        })
    
    } catch(error) {


        console.log(error)

        res.status(500).json({
            msg: "Something went wrong!"
        })
    }  
    
}


const isUserAuthor = (req,res,next) => {

    


}


const isUserAdmin = (req,res,next) => {

    const user = req.user

    if(user.role !== "ADMIN"){

       return res.status(401).json("Action restricted")

    }
    next()

}


module.exports ={
    registerUser,
    loginUser,
    isUserAdmin
}


