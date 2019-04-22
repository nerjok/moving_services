const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    password: String,
    credits: {type: Number, default: 0}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('users', userSchema);
