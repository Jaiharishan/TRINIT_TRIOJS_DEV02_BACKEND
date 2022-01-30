const Org = require('../../DB/models/organisations')
const Bug = require('../../DB/models/bugs')
const router = require('express').Router();
router.get('/:orgId', async(req, res) => {
    try {
        const orgId = req.params.orgId;
        const bugList = await Org.findById(orgId)
            .populate({
                path: 'bugs',
                populate: { path: 'createdBy', select: '-password' }
            }).select('bugs')
        res.status(200).json({
            message: bugList
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
router.get('/', async(req, res) => {
    try {
        const bugList = await Bug.find({}).select('_id')
        res.status(200).json({
            message: bugList
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router;