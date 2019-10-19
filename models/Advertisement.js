const mongoose = require('mongoose');
const { Schema } = mongoose;
var mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const { cities } = require('../constants');
const { advertisementPhotos } = require('../helpers/advertisements');


const advertisementSchema = new Schema({
  title: {type: String, required: true, minlength: 10},
  description: {type: String, required: true, minlength: 50},
  skills: String,
  tools: String,
  time: String,
  payment: String,
  status: String,
  workType: Number,
  city: {type: String, required: false},
  dateTime: {type: Date, required: true},
  location: {
    type: { type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
		
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { toJSON: { virtuals: true } },{ timestamps: true });


advertisementSchema.virtual('cityName').get(function name() {
  let cityName = cities.find(city => city.value == this.city);
  return cityName;
});  


advertisementSchema.virtual('photos').get(function name() {
  let photos = advertisementPhotos(this._id);
  return photos;
});  

advertisementSchema.index({'location.coordinates': '2dsphere'});
advertisementSchema.plugin(mongoosePaginate);
advertisementSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true});

mongoose.model('Advertisement', advertisementSchema);
