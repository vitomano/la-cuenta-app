require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('public'));


app.listen(process.env.PORT, () =>
    console.log(`Listen in port ${process.env.PORT}`))