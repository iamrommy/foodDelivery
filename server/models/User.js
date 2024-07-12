const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim: true
    },
    googleId: {
        type: String
    },
    email: {
        type: String,
        required:true,
    },
    password:{
        type: String,
    },
    token:{
        type:String
    }

});

module.exports = mongoose.model("User", userSchema);