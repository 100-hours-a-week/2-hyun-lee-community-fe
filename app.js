const express=require('express');
const userRoutes = require('./routes/userRoutes');
const colors = require('colors');
const moment = require('moment');
require('dotenv').config();


const app= express();
app.use(express.json());

app.use('/api',userRoutes);

const PORT=3000;



app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`.green);
});