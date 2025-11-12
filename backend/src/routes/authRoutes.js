const express = require('express');
const {register,login} = require('../controllers/authController.js')
const isValidToken = require('../middlewares/authMiddleware.js')


const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me',isValidToken,(req,res)=>{
    res.json(req.user)
})

module.exports = router