const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const { config } = require('dotenv')
config({
    path: __dirname + "/.env"
})

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const mongoose = require('mongoose')
const { Presence } = require('./models/Presence')
const { Cls } = require('./models/Cls')

mongoose.connect(process.env.MongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))



app.get('/classList', async (req, res) => {
    const allClass = await Cls.find().sort('class')
    res.json(allClass)
})

app.get('/classList/:id', async (req, res) => {
    const oneClasses = await Presence.find({ class: req.params.id })
    res.json(oneClasses)
})

app.get('/classPupils/:id', async (req, res) => {
    const oneClass = await Cls.find({ class: req.params.id })
    res.json(oneClass)
})

app.get('/presentPupils/:id', async (req, res) => {
    const presentPupils = await Presence.find({ _id: req.params.id })
    res.json(presentPupils)
})



if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`))