const mongoose = require('mongoose');
const { Schema } = mongoose;
var mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');


const advertisementSchema = new Schema({
    title: String,
    description: String,
    latitude: String,
    longitude: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
});

advertisementSchema.plugin(mongoosePaginate);
advertisementSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true});

mongoose.model('Advertisement', advertisementSchema);
