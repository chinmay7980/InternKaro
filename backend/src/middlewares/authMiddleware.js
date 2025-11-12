const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


async function isValidToken(req,res,next){
    
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await prisma.user.findUnique({
            where:{id:decoded.id}
        })

        next()

    }catch(error){
        return res.status(401).json({message:"not authorized token failed"})
    }
    else{
        res.status(401).json({message:'no token provided'})
    }
}


module.exports = isValidToken;
