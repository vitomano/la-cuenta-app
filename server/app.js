require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { connectedDB } = require('./database/mongoDB.config')
const app = express()


//Database
connectedDB()

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

//Routes
app.use('/api/auth', require('./routes/users.route'))


app.listen(process.env.PORT, () =>
    console.log(`Server on port ${process.env.PORT}`))