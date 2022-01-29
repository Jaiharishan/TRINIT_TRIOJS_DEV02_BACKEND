const router = require('express').Router();
const jwt = require('jsonwebtoken')

//imports goes here
const getUserRouter = require('./routers/getUser');
const getUsersRouter = require('./routers/getUsersId');
const getOtherUserRouter = require('./routers/getOtherUser');

const { verifyJWT } = require('../jwt');

//use the imports here
router.use('/self', verifyJWT ,getUserRouter) // get the primary user
router.use('/users', getUsersRouter)
router.use('/user', getOtherUserRouter) // get other users

module.exports = router;