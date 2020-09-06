const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }, //프로필 이미지
        role: {
            type: String,
            default: "user" //회원등급별, 관리자인지 user인지
        },
        resetPasswordLink: ""
    },
    {
        timestamps: true //업데이트 날짜, 생성날짜
    }

)

module.exports = mongoose.model("user", userSchema)

