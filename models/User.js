const mongoose = require('mongoose');
const bcryptJS = require('bcryptjs');
const { threadId } = require('worker_threads');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true, "Please provide your Name"],
        minlength : 3
    },
    password:{
        type: String,
        required:[true, "Please provide Password"],
        minlength : 6
    },
    email:{
        type : String,
        required : [true, "Please provide Email address"],
        unique : true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ]
    }
})

UserSchema.pre( 'save', async function(){
    const salt = await bcryptJS.genSalt(10);
    this.password = await bcryptJS.hash(this.password, salt)
})   

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID : this._id, name : this.name}, "KaPdSgVkXp2s5v8y/B?E(H+MbQeThW", {expiresIn : '30d'})
}

UserSchema.methods.ComparePassword = async function(candidatePassword){
    const isMatch = await bcryptJS.compare(candidatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('User', UserSchema)