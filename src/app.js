const express = require('express')
const initializePassport = require('./config/passport')
const userRouter = require('./routes/user')


const app = express()


app.use(express.urlencoded({extended:false}))


app.use('/',userRouter)



app.listen(5000, ()=>{
    console.log('Server running on port: 5000')
})