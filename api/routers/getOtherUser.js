const router = require('express').Router();
const User = require('../../DB/models/users')

router.get('/:userName', async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({userName: userName});

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