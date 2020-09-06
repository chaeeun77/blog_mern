const express = require('express')
const router = express.Router()
const userModel = require('../model/user')


// @router  POST http://localhost:3000/user/register
// @des Register user
// @access Public 일반적으로 허용되는건지 로그인을 해야하는건지
router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    const newUser = new userModel({
        name, email, password
    })

    newUser
        .save()
        .then(user => {
            res.json({
                message: "saved user",
                userInfo: user
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })


})


// @router  POST http://localhost:3000/user/login
// @des Login user & get token
// @access unique
router.post('/login', (req, res) => {

})


module.exports = router;