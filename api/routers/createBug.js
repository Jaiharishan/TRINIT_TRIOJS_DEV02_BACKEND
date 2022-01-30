const Bug = require('../../DB/models/bugs')
const Org = require('../../DB/models/organisations')
const router = require('express').Router();

router.post('/:orgId', async(req, res) => {
    try {
        let { title, description, severity, visibility } = req.body;
        const userId = req.jwt_payload._id;
        const orgId = req.params.orgId;
        const { head, rank1, rank2 } = await Org.findById(orgId)
        if (!(head == userId || rank1.includes(userId) || rank2.includes(userId))) {
            visibility = 'public'
        }
        const createBug = new Bug({
            title,
            description,
            severity,
            orgId,
            createdBy: userId,
            visibility
        })
        await createBug.save();
        await Org.findByIdAndUpdate(orgId, { $addToSet: { bugs: createBug._id } })
        res.status(201).json({
            message: "Bug created"
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }

})
module.exports = router