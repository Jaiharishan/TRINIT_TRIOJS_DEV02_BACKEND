const Bug = require('../../DB/models/bugs')
const Discussion = require('../../DB/models/discussions')
const router = require('express').Router();
router.post('/bug/:bugId', async(req, res) => {
    try {
        const bugId = req.params.bugId;
        const userId = req.jwt_payload._id;
        const { description } = req.body;

        const createDisc = new Discussion({
            description,
            openedBy: userId
        })
        await createDisc.save()
        await Bug.findByIdAndUpdate(bugId, { $addToSet: { comment: createDisc._id } })
        res.status(200).json({
            message: "bug commented"
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }

})
router.post('/comment/:commentId', async(req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.jwt_payload._id;
        const { description } = req.body;

        const createDisc = new Discussion({
            description,
            openedBy: userId
        })
        await createDisc.save()
        await Discussion.findByIdAndUpdate(commentId, { $addToSet: { comments: createDisc._id } })
        res.status(200).json({
            message: "Commented to a discussion"
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router;