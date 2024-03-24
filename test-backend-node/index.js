const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const mongoUrl = 'mongodb+srv://doonel:doonelPass@cluster0.3fib4nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.route'))

async function start(){
    try{
        await mongoose.connect(mongoUrl)

        app.listen(PORT, () => {
            console.log('server on ', PORT);
        })
    }
    catch(err){
        console.log(err);
    }
}

start()