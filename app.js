const express=require('express');
const userRoutes = require('./routes/userRoutes');
const colors = require('colors');
const moment = require('moment');
const path = require('path');
const cors =require('cors');
require('dotenv').config();


const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public'))); // HTML, CSS, JS 파일이 있는 디렉토리
app.use('/', userRoutes);
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/community', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'community.html'));
});
const PORT=3000;

app.use((err, req, res, next) => {
    console.error(err.stack); // 오류 로그 출력
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}, Method: ${req.method}`);
    next();
});

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`.green);
});