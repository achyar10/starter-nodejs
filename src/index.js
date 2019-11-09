import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import route from './Routes'

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/learn', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use('/api', route)

app.get('/', (req, res) => {
    return res.send(`<h3>It's Work</h3>`)
})

app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page not found!</h2>')
})

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')}`)
})