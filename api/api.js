const router = require('express').Router();
// const jwt = require('jsonwebtoken')

//imports goes here
const getUserRouter = require('./routers/getUser');
const getUsersRouter = require('./routers/getUsersId');
const getOtherUserRouter = require('./routers/getOtherUser');
const editUserRouter = require('./routers/editUser')
const createOrgRouter = require('./routers/createOrg')
const { verifyJWT } = require('../middlewares/jwt');

// //use the imports here
// router.use('/self', verifyJWT, getUserRouter) // get the primary user
// router.use('/users', getUsersRouter)
// router.use('/user', getOtherUserRouter) // get other users
router.use('/user/edit', verifyJWT, editUserRouter)
router.use('/org/create', verifyJWT, createOrgRouter)
module.exports = router;