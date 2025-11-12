const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const {PrismaClient} = require('@prisma/client');
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express()
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors())

app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send('Server is Running')
})

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log('Server is Running on Port 5000.')
})