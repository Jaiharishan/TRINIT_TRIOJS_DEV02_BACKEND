const User = require('../../DB/models/users')
const router = require('express').Router();

router.get('/:userId', async(req, res) => {
    try {
        const userId = req.params.userId
        const orgList = await User.findById(userId)
            .populate({
                path: 'employeeAt.orgId',
                populate: {
                    path: 'head',
                    select: 'userName'
                }
            })
            .populate({
                path: 'ownOrg',
                populate: {
                    path: 'head',
                    select: 'userName'
                }
            })
            .select('employeeAt ownOrg')
        return res.status(200).json({
            message: orgList
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server error"
        })
    }

})
module.exports = router;