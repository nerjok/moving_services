const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: {type: String, required: true, minlength: 5},
    email: {type: String, required: true, minlength: 5},
    description: {type: String, required: true, minlength: 10},
    available: {type: String, required: true, minlength: 10},
    city: {type: String, required: true, minlength: 10},
    password: String,
    credits: {type: Number, default: 0},
    //_advertisements: [{type: Schema.Types.ObjectId, ref: 'advertisements'}],
}, { toJSON: { virtuals: true }, timestamps: true });

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

mongoose.model('User', userSchema);
