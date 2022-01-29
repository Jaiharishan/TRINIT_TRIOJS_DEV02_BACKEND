const Org = require('../../DB/models/organisations')
const User = require('../../DB/models/users')
const router = require('express').Router()

router.put('/:orgId', async(req, res) => {
    try {
        const headId = req.jwt_payload._id;
        const orgId = req.params.orgId;
        const { memberId, rank } = req.body;

        const orgDetails = await Org.findById(orgId)
        if (orgDetails.head == headId) {
            if (rank == 'rank1') {
                await Org.findByIdAndUpdate(orgId, { $addToSet: { rank1: memberId } })
                await User.findByIdAndUpdate(memberId, { $addToSet: { employeeAt: { orgId, rank: 'rank1' } } })
                return res.status(200).json({
                    message: "Member added"
                })
            } else if (rank == 'rank2') {
                await Org.findByIdAndUpdate(orgId, { $addToSet: { rank2: memberId } })
                await User.findByIdAndUpdate(memberId, { $addToSet: { employeeAt: { orgId, rank: 'rank2' } } })
                return res.status(200).json({
                    message: "Member added"
                })
            } else {
                return res.status(400).json({
                    message: "rank not valid"
                })
            }
        } else {
            return res.status(400).json({
                message: "You are not the head"
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