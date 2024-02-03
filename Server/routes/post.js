const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { afterUploadImage, uploadPost } = require('../controllers/post');

try{    // uploads 폴더 만들어 사용자가 업로드한 이미지를 저장
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            console.log(file);
            const ext = path.extname(file.originalname);    
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);   // 파일명 중복을 피하기 위해 파일명에 현재 시간을 추가, 이미지.png -> 이미지123456.png
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;