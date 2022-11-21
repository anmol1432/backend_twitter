const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT
const db = process.env.DATABASE

app.use(cors())
app.use(express.json());
app.use(require('./routes/index'))

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("MONGO DB CONNECTED");
}).then(() => {
    app.listen(port, () => {
        console.log(`SERVER RUNNING :- http://localhost:${port}`)
    })
}).catch((error) => {
    console.log(error)
})


