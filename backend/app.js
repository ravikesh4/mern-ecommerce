const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const expressValidator = require('express-validator')
// const { check, validationResult } = require('express-validator');

require('dotenv').config()

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

// app
const app = express()

// db 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( () => console.log('DB Connected'))

const port = process.env.PORT || 8000;

// middleware 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());
// app.use(check());

// routes middleware 
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))