const db =require('../config/db');

const User={
        create: (userData, callback) => {
            const query = 'INSERT INTO user (username, useremail, reg_date, password, nickname, profile) VALUES (?, ?, NOW(), ?, ?, ?)';
            db.query(query, [userData.username, userData.useremail, userData.password, userData.nickname, userData.profile], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        },
        findAll:(callback)=>{
            db.query('SELECT * FROM user',(err,results)=>{
                if(err){
                    return callback(err);
                }
                callback(null,results);
            });

        },
};

module.exports=User;