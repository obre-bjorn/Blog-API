const bcrypt = require('bcryptjs')
const userQueries = require('../db/userQueries')



//TODO: To validate user 

const registerUser = async (req,res) =>{

    try {

        req.body.password = await bcrypt.hash(req.body.password,10)

        const user = await userQueries.createUser(req.body)


        res.status(200).json({
            msg: "UserCreated",
            user: user
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Something went wrong"
    })
        
    }
    
    
}


module.exports ={
    registerUser
}


