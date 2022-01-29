const router = require('express').Router();
const Bug = require('../../DB/models/bugs')
const Org = require('../../DB/models/organisations')
const User = require('../../DB/models/users')
router.post('/member/:bugId/:memberId', async(req, res) => {
    try {
        const assignerId = req.jwt_payload._id;
        const bugId = req.params.bugId;
        const memberId = req.params.memberId;
        const { orgId } = await Bug.findById(bugId);
        const { rank1, head } = await Org.findById(orgId)
        if (rank1.includes(assignerId) || assignerId == head) {
            await Bug.findByIdAndUpdate(bugId, { $addToSet: { assignedTo: memberId } });
            await User.findByIdAndUpdate(memberId, { $addToSet: { bugsAssigned: bugId } });
            return res.status(200).json({
                message: "Member assigned to the bug"
            })
        } else {
            return res.status(403).json({
                message: "You are not authorized"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server error"
        })
    }
})
router.post('/request/:bugId', async(req, res) => {
    try {
        const bugId = req.params.bugId;
        console.log(bugId)
        const requesterId = req.jwt_payload._id;
        const { orgId } = await Bug.findById(bugId);
        const { rank1, head } = await Org.findById(orgId)
        if (rank1.includes(requesterId) || requesterId == head) {
            return res.status(200).json({
                message: "You belong to rank1 or head"
            })
        } else {
            await Bug.findByIdAndUpdate(bugId, { $addToSet: { assignRequests: requesterId } })
            return res.status(200).json({
                message: "Assign request added"
            })
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Server error"
        })
    }


})
module.exports = router;