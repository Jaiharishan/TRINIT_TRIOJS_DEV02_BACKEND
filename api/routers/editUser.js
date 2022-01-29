const { upload } = require('../../middlewares/multer');
const User = require('../../DB/models/users')
const router = require('express').Router();

router.put('/', async(req, res) => {
    try {
        const userId = req.jwt_payload._id;

        upload(req, res, async(err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err
                })
            }
            const { description } = req.body;
            await User.findByIdAndUpdate(userId, { profilePic: `/uploads/${req.file.filename}`, description })

            return res.status(201).json({
                message: "User details updated"
            })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: "Server error"
        })
    }
})
module.exports = router