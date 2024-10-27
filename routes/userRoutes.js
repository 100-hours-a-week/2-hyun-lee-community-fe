const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');

// 사용자 생성 라우트
router.post('/users',userController.createUser);

//사용자 목록 조회 라우트
router.get("/users",userController.getUsers);

module.exports=router;