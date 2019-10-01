const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate-v2');
const { cities, availability } = require('../constants');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: {type: String, required: false, minlength: 5},
    email: {type: String, required: true, minlength: 5},
    phone: String,
    description: {type: String, required: false, minlength: 10},
    available: {type: String, required: false, minlength: 10},
    city: {type: String, required: false},
    status: {type: Number, default: 1 },
    experience: {type: String, minlength: 10},
    prices: {type: String, minlength: 10},
    scope: {type: String, minlenght: 10},
    profile_photo: {type: String},
    work_photos: {type: [String]},
    sphere: {type: String, minlenght: 10},
    availableTime: {type: [Number], unique: false },
    rate: Number,
    password: String,
    password_reset: String,
    credits: {type: Number, default: 0},
    //_advertisements: [{type: Schema.Types.ObjectId, ref: 'advertisements'}],
}, { toJSON: { 
              virtuals: true,
              transform: function (doc, ret) {
                delete ret.password;
                delete ret.password_reset;
                return ret;
              }
            
            }, timestamps: true });

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

userSchema.virtual('cityName').get(function name(params) {
  let cityName = cities.find(city => city.value == this.city)
  return cityName;
})  

userSchema.virtual('availability').get(function name(params) {
  let avl = availability.find(city => city.value == this.status)
  return avl;
})  


userSchema.methods.passwordReset = async function() {
  const password_reset = this.generateHash(+new Date());
  return this.updateOne({password_reset} , {new: true}).then(data => {
    if (data.ok)
     return password_reset;
    else
      return {err: 'err'}
  })
  .catch(err => err);
}

userSchema.methods.passwordSet = function(passwordd) {
  const password  = this.generateHash(passwordd);
  return this.updateOne({password} , {new: true}).then(data => {
    if (data.ok)
     return {ok: 'ok'};
    else
      return {err: 'err'}
  })
  .catch(err => err);
}

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
