require('dotenv').config({ path: './env/.env' })
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
require('./DB/setup')
    // require('./cronjob')
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const authRouter = require('./api/auth');
const apiRouter = require('./api/api')
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use('/api', apiRouter)
app.use('/auth', authRouter)


app.listen(port, () => console.log(`Listening on port ${port}`));