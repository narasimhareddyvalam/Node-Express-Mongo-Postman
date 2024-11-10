const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(file.mimetype);
        if (extName) cb(null, true);
        else cb(new Error('Only JPEG, PNG, and GIF formats are allowed'));
    }
});

router.post('/create', userController.createUser);
router.put('/edit', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
router.post('/uploadImage', upload.single('image'), userController.uploadImage);

module.exports = router;
