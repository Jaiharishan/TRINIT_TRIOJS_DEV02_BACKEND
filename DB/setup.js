require('dotenv').config({ path: './env/.env' })
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', async() => {
    gfs = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: "uploads"
    })
    console.log('DB connection success!')
})