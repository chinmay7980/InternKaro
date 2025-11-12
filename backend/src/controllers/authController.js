const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken.js')

const prisma = new PrismaClient()


async function register(req,res){
    try {
        const {name,email,password} = req.body;
        // console.log("HELLO")
        const userExitis = await prisma.user.findUnique({
            where:{email}
        })
        if (userExitis){
            return res.status(400).json({
                meassage:'User already Exitis'
            })

        }
        const hashPassword =await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword
            }
        })

        const token = generateToken(user.id)
        // console.log(token)
        res.status(201).json({user,token})
    }catch(error){
        console.log(error)
    }

}   
async function login(req,res) {
    try {
        const {email,password} = req.body;

        const user = await prisma.user.findUnique({
            where:{email}
        })
        if (!user){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({
                message:'invalid credentials'
            })
        }
        const token = generateToken(user.id)
        res.status(200).json({user,token})
    }catch(error){
        console.log(error)
    }
}
module.exports = {register,login};