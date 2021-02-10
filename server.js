const express = require("express")
const app = express()
const db = require('./config/db')
const router = require('./router/index')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const morgan = require("morgan")
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.use("/public", express.static("./public"))
app.use('/api/v1', router)

app.listen(4000, (req, res) => {
    console.log('Server Work')
})

// connect to database
db.authenticate()
    .then(() => {
        console.log('success connect to db')
    }).catch((e) => {
        console.log(e)
    })