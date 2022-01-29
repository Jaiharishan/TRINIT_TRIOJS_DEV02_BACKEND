const router = require('express').Router();
const Bug = require('../../DB/models/bugs')
const Org = require('../../DB/models/organisations')
const User = require('../../DB/models/users')
router.post('/:bugId/:memberId', async(req, res) => {
    try {
        const assignerId = req.jwt_payload._id;
        const bugId = req.params.bugId;
        const memberId = req.params.memberId;
        const { orgId } = await Bug.findById(bugId);
        const { rank1, head } = await Org.findById(orgId)
        if (rank1.includes(assignerId) || assignerId == head) {
            await Bug.findByIdAndUpdate(bugId, { $addToSet: { assignedTo: memberId } });
            await User.findByIdAndUpdate(memberId, { $addToSet: { bugsAssigned: bugId } });
        }
        res.status(200).json({
            message: "Member assigned to the bug"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router;