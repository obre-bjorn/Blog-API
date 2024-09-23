const express = require('express')
const initializePassport = require('./config/passport')
const userRouter = require('./routes/user')

//& TEST FOR AUTHENTICATION TOKEN
const passport = require('passport')

const app = express()

initializePassport()

app.use(express.urlencoded({extended:false}))


app.use('/',userRouter)

app.use('/protected', passport.authenticate('jwt', {session : false}), (req,res) => {

    if(!req.user){
        return res.status(400).json({msg: 'Not Authenticated'})
    }

    return res.status(200).json({
        msg: 'Authorized User',
        user : req.user})
})


app.listen(5000, ()=>{
    console.log('Server running on port: 5000')
})