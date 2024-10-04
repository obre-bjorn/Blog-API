const express = require('express')
const cors = require('cors')
const initializePassport = require('./config/passport')

// Routes
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')


require('dotenv').config()

//& TEST FOR AUTHENTICATION TOKEN
const passport = require('passport')

const app = express()

initializePassport()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,}
    )
)


app.use('/', userRouter)
app.use('/', postRouter)
app.use('/', commentRouter)

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
