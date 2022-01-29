const Org = require('../../DB/models/organisations')
const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const orgList = await Org.find({}).select('_id')
        res.status(200).json({
            data: orgList
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})
router.get('/:orgId', async(req, res) => {
    try {
        const orgId = req.params.orgId;
        const orgDetails = await Org.findById(orgId)
            .populate({ path: 'head', select: '-password' })
            .populate({ path: 'rank1', select: '-password' })
            .populate({ path: 'rank2', select: '-password' })
            .populate('bugs');
        res.status(200).json({
            data: orgDetails
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router;