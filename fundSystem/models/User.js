const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //头像
    avatar: {
        type: String,
    },
    //身份标识
    identity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        Default: Date.now
    }
})
module.exports = User = mongoose.model('users', UserSchema);