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

    console.log(req.body);
    const {username, password } = req.body


    try {

        const user = await userQueries.findUserByUsername(username)

        if(!user){

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
            user: user,
            token : 'Bearer ' + token
        })

    } catch(error) {


        console.log(error)

        res.status(500).json({
            msg: "Something went wrong!"
        })
    }

}



const loginAdminUser = async (req,res) => {


    const {username,password} = req.body

    try {

        const user = await userQueries.findUserByUsername(username)

        if(!user){

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


        if (user.role !== "ADMIN"){

            return res.status(401).json({msg: "User restriceted"})
        }


        return res.status(200).json ( {
            success : true,
            user: user,
            token : 'Bearer ' + token
        })
    }catch{

        res.status(500).json({
            msg: "Something went wrong!"
        })


    } 




}

const getAllUsers = async (req,res) =>{

  try{

    const users = await userQueries.getAllUsers()

    return res.status(200).json({msg:"Succesfully retrived users", users : users })

  }catch(error){

    console.log(error)
    return res.status(500).json({msg: "Error retriving users"})
  }

}

const updateUser = async (req,res) => {

  const {role} = req.body.role

  try{

    const user = await userQueries.updateUser(parseInt(req.params.userId),role)

    return res.status(200).json({msg: "Updated User Succesfully"})
  }catch(error){

    console.log(error)
    return res.status(500).json({msg: "Error Updating user"})

  }

}



const isUserAdmin = (req,res,next) => {

    const user = req.user

    if(user.role !== "ADMIN"){

       return res.status(401).json("Action restricted")

    }
    next()

}


module.exports ={
    getAllUsers,
    updateUser,
    registerUser,
    loginUser,
    loginAdminUser,
    isUserAdmin
}
