const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    password: String,
    credits: {type: Number, default: 0},
    //_advertisements: [{type: Schema.Types.ObjectId, ref: 'advertisements'}],
}, { toJSON: { virtuals: true } });

userSchema.virtual('advertisements', {
    ref: 'Advertisement',
    localField: '_id',
    foreignField: '_user',
  });

  userSchema.virtual('advertisementsCount', {
    ref: 'Advertisement',
    localField: '_id',
    foreignField: '_user',
    count: true
  });  

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    currentPassword = this.password || ''
    return bcrypt.compareSync(password, currentPassword);
};

userSchema.methods.checkPassword = function(password) {
    if (!this.password)
      return true;
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(mongoosePaginate);

mongoose.model('users', userSchema);
