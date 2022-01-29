const router = require('express').Router();
const User = require('../../DB/models/users');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(400).json({
                msg: "Users not found"
            })
        }

        let usersName = users.map(user => {
            return user.userName;
        })

        return res.status(200).json({
            msg: "Users found successfully",
            usersName
        })



    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

module.exports = router;