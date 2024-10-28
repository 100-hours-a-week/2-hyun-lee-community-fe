const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (userData) => {
        try {
            console.log(userData);

            // 이메일 중복 확인
            const emailExists = await User.findByEmail(userData.useremail);
            if (emailExists) {
                throw new Error('이미 사용 중인 이메일입니다.');
            }

            // 닉네임 중복 확인
            const nicknameExists = await User.findByNickname(userData.nickname);
            if (nicknameExists) {
                throw new Error('이미 사용 중인 닉네임입니다.');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const query = 'INSERT INTO user (username, useremail, reg_date, password, nickname, profile) VALUES (?, ?, NOW(), ?, ?, ?)';
            return new Promise((resolve, reject) => {
                db.query(query, [userData.username, userData.useremail, hashedPassword, userData.nickname, userData.profile], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        } catch (err) {
            throw err; // 오류를 throw하여 상위에서 처리하도록 함
        }
    },

    findAll: async () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    
    findByEmail: async (email)=>{
        return new Promise((resolve,reject)=>{
            db.query('SELECT * FROM user WHERE useremail = ?', [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.length > 0); // 중복이면 true, 아니면 false 반환
            });
        });
        
    },
    findByNickname: async (nickname) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE nickname = ?', [nickname], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.length > 0); // 중복이면 true, 아니면 false 반환
            });
        });
    }
};

module.exports = User;
