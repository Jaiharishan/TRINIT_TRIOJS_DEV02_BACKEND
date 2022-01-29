const router = require('express').Router();
// const jwt = require('jsonwebtoken')

//imports goes here
const getUserRouter = require('./routers/getUser');
const getUsersRouter = require('./routers/getUsersId');
const getOtherUserRouter = require('./routers/getOtherUser');
const editUserRouter = require('./routers/editUser')
const createOrgRouter = require('./routers/createOrg')
const addMemberRouter = require('./routers/addMember')
const listOrgRouter = require('./routers/listOrg')
const createBugRouter = require('./routers/createBug')
const addCommentRouter = require('./routers/commentBug')
const viewCommentRouter = require('./routers/bugDetails')
const orgDetailsRouter = require('./routers/Allorgs')
const bugListRouter = require('./routers/bugList')
const assignBugRouter = require('./routers/assignBug')
const closeBugRouter = require('./routers/closeBug')
const { verifyJWT } = require('../middlewares/jwt');

// //use the imports here
router.use('/self', verifyJWT, getUserRouter) // get the primary user
router.use('/users', getUsersRouter)
router.use('/user', getOtherUserRouter) // get other users
router.use('/user/edit', verifyJWT, editUserRouter)
router.use('/user/orglist', listOrgRouter)
router.use('/org/create', verifyJWT, createOrgRouter)
router.use('/org/addMember', verifyJWT, addMemberRouter)
router.use('/bug/create', verifyJWT, createBugRouter)
router.use('/comment/add', verifyJWT, addCommentRouter)
router.use('/view/bug', viewCommentRouter)
router.use('/view/bugList', bugListRouter)
router.use('/view/orgs', orgDetailsRouter)
router.use('/bug/assign', verifyJWT, assignBugRouter)
router.use('/bug/close', verifyJWT, closeBugRouter)
module.exports = router;