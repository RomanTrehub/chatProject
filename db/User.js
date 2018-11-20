const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
/*     userId:{
        type: String,
        unique: true,
        required: true
    }, */
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ban: {
        type: Boolean,
        required: true,
        default: false
    },
    mute:{
        type: Boolean,
        required: true,
        default: false       
    },
    admin:{
        type: Boolean,
        required: true,
        default: false         
    }
    
})
module.exports = mongoose.model('User', userSchema);
