const router = require('express').Router();
const Bug = require('../../DB/models/bugs')

router.put('/:bugId', async(req, res) => {
    try {
        const bugId = req.params.bugId;
        const userId = req.jwt_payload._id;
        const { createdBy } = await Bug.findById(bugId);
        if (createdBy == userId) {
            await Bug.findByIdAndUpdate(bugId, { status: 'closed', closedAt: new Date() })
            return res.status(200).json({
                message: "Bug closed"
            })
        } else {
            return res.status(403).json({
                message: "Unauthorized"
            })
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }

})
module.exports = router;