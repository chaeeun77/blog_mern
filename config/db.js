const mongoose = require('mongoose');

//데이터베이스 연결
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

mongoose
    .connect(process.env.MONGO_URI, dboptions)
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err.message))
