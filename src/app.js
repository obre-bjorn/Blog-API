const express = require('express')


const app = express()


app.use(express.urlencoded({extended:false}))




app.listen(5000, ()=>{
    console.log('Server running on port: 5000')
})