const router = require('express').Router();
const User = require('../../DB/models/users')

router.get('/', async (req, res) => {
    try {
        const id = req.jwt_payload._id;
        const user = await User.findById(id);

        if (!user) {
            res.status(400).json({
                msg:"User does not exist"
            })
        }

        res.status(200).json({
            msg:"user found successfully",
            user
        })

    }
    catch(err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

module.exports = router;