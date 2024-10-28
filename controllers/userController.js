const User = require('../models/user');

const userController={
    createUser: async (req,res,next)=>{
        const userData = {
            username: req.body.username,
            useremail: req.body.useremail,
            password: req.body.password,
            nickname: req.body.nickname,
            profile: req.file ? req.file.path : null, // 파일 경로
        };

        
        try{
            const result= await User.create(userData);
            console.log("회원가입 id",result.insertId);
            return res.status(201).json({
                message: '회원가입 성공',
                userId:result.insertId
            });
        } catch(error){
            console.error('Error creating user:', error);
            next(error);
        }
    },
    getUsers:(req,res)=>{
        User.findAll((err,results)=>{
            if(err){
                return res.status(500).json({error:'Database error'});
            }
            res.json(results);
        })
    },
    checkEmail : async(req,res)=>{
        try{
            const email =req.query.email;
            const isDuplicated=await User.findByEmail(email);
            res.json({isDuplicated});
        } catch(error){
            res.status(500).json({message: '서버 오류'});
        }
    },
    
    checkNickname: async(req,res)=>{
        try{
            const nickname =req.query.nickname;
            const isDuplicated=await User.findByNickname(nickname);
            res.json({isDuplicated});
        } catch(error){
            res.status(500).json({message: '서버 오류'});
        }
    }
};

module.exports=userController;