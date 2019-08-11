const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


//引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

//db config
const db = require('./config/keys').mongoURI;

const app = express();
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//连接数据库
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoDB Connetced');
    }).catch((err) => {
        console.log(err);
    })

//passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//使用路由
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server start port ${port}`);
})