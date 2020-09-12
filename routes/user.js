const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

//회원가입
// @router  POST http://localhost:3000/user/register
// @des Register user
// @access Public 일반적으로 허용되는건지 로그인을 해야하는건지
router.post('/register', (req, res) => {
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.json({
                    message: "이미 아이디가 존재합니다."
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: "200", //사이즈
                    r: "pg", //형식
                    d: "mm" //단위

                })

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.json({
                            message: err.message
                        })

                    } else {
                        const { name, email, password } = req.body

                        const newUser = new userModel({
                            name, email, password: hash,
                            avatar: avatar
                        })

                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    message: "saved user",
                                    userInfo: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        password: user.password,
                                        avatar: user.avatar,
                                        date: {
                                            createdDate: user.createdAt,
                                            updatedDate: user.updatedAt
                                        }
                                    }
                                })
                            })
                            .catch(err => {
                                res.json({
                                    message: err.message
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//로그인
// @router  POST http://localhost:3000/user/login
// @des Login user & get token
// @access unique
router.post('/login', (req, res) => {
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.json({
                    message: "이메일이 존재하지 않습니다."
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err || result === false){
                        return res.json({
                            success: result,
                            message: "password incorrect"
                        })
                    } else {
                        const token = jwt.sign(
                            {email: user.email, id: user._id},
                            "secret",
                            {expiresIn: "1d"}
                        )
                        res.json({
                            success: result,
                            token: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


module.exports = router;