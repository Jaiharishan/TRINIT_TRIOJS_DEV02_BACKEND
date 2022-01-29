const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callback) => {
        console.log(req.body);
        callback(null, (Date.now()) + path.extname(file.originalname));
    }
})
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    // Max 10MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('profilePic');

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = mimeTypes.includes(file.mimetype);
    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb('error: images only!')
    }
}
module.exports = { upload };