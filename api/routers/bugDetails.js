const Bug = require('../../DB/models/bugs')
const Discussion = require('../../DB/models/discussions')
const router = require('express').Router()

router.get('/:bugId', async(req, res) => {
    try {
        const bugId = req.params.bugId;
        const bugDetails = await Bug.findById(bugId)
            .populate('comment orgId')
        res.status(200).json({
            message: bugDetails
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
router.get('/comment/:commentId', async(req, res) => {
    try {
        const commentId = req.params.commentId;
        const commentDetails = await Discussion.findById(commentId)
            .populate('comments openedBy')
        res.status(200).json({
            message: commentDetails
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router;