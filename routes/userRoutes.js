const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');
const multer = require('multer');
const upload = multer({dest:'uploads/'});


router.post('/register', upload.single('profileImage'), userController.createUser);

// 사용자 생성 라우트



router.get('/check-email', userController.checkEmail);

// 닉네임 중복 확인 라우트
router.get('/check-nickname', userController.checkNickname);


//사용자 목록 조회 라우트
router.get("/users",userController.getUsers);


module.exports=router;