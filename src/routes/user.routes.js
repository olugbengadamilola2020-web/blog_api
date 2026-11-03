const express = require('express');
const multer = require('multer');

const { registerUser, loginUser } = require('../controllers/user.controller.js');

const router = express.Router();

const upload = multer({
     dest: 'uploads/', 
     limits: { fileSize: 3 * 1024 * 1024 } 
    });

router.post('/upload/avatar', upload.single('image'), (req, res) => {
    const fileUrl = req.file.path;
    const fileName = req.file.filename;

    console.log(fileName);
    console.log(fileUrl);
     res.send('Avatar uploaded');
});

router.post('/upload', upload.array('image', 5), (req, res) => {
    const fileUrls= req.files.map(file => file.path);
    const fileNames = req.files.map(file => file.filename);

    console.log(fileNames);
    console.log(fileUrls);
     res.send('Uploaded images successfully');
});


router.post("/sign-up", registerUser);
router.post("/login", loginUser);


module.exports = router;