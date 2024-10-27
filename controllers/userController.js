const User = require('../models/user');

const userController={
    createUser:(req,res)=>{
        const userData = req.body;
        User.create(userData,(err,results)=>{
            if(err){
                return res.status(500).json({error :'Database error'});
            }
            res.status(201).json({message:'User created',userId:results.insertId});
        });
    },
    getUsers:(req,res)=>{
        User.findAll((err,results)=>{
            if(err){
                return res.status(500).json({error:'Database error'});
            }
            res.json(results);
        })
    }
};

module.exports=userController;