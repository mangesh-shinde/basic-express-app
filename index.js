const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/User")
require("dotenv").config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json()) //to accept request body from client in JSON format
app.use(express.urlencoded({extended : false})) // to accept request body from client in url encoded format (e.g. from forms)

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_HOST = process.env.MONGO_HOST
const MONGO_DB=process.env.MONGO_DB

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}, () => {
    console.log("Connected")
})

app.use('/users', userRoute)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

