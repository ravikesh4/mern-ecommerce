const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// import routes
const userRoutes = require('./routes/user')

// app
const app = express()

// db 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log('DB Connected'))

const port = process.env.PORT || 8000;

// routes middleware 
app.use('/api', userRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))