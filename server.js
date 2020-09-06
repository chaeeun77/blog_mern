const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv')
dotEnv.config()
require('./config/db')


//미들웨어 설정
app.use(morgan('dev'));

//body-parser에 대한 미들웨어 설정
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//라우터
const profileRoutes = require('./routes/profile')
const userRoutes = require('./routes/user')


app.use('/user', userRoutes)
app.use('/profile', profileRoutes)


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`server start at ${PORT}`))