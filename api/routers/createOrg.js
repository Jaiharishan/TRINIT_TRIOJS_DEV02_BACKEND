const { upload } = require('../../middlewares/multer');
const Org = require('../../DB/models/organisations')
const User = require('../../DB/models/users')
const router = require('express').Router();

router.post('/', async(req, res) => {
    try {
        const userId = req.jwt_payload._id;


        upload(req, res, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err
                })
            }
            try {
                const { name, description } = req.body;
                console.log(req.body)
                const createOrg = new Org({
                    name,
                    description,
                    head: userId,
                    profilePic: `/uploads/${req.file.filename}`
                })
                await createOrg.save()
                await User.findByIdAndUpdate(userId, { $addToSet: { ownOrg: createOrg._id } })
                res.status(200).json({
                    message: "Org created"
                })
            } catch (err) {
                console.log(err.message)
                console.log(err.message)
                res.status(500).json({
                    message: "Server error"
                })
            }

        })
    } catch (err) {

    }

})
module.exports = router;