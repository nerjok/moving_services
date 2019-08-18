const mongoose = require('mongoose');
const { Schema } = mongoose;
var mongoosePaginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');


const advertisementSchema = new Schema({
    title: {type: String, required: true, minlength: 10},
    description: {type: String, required: true, minlength: 50},
    skills: String,
    tools: String,
    time: String,
    payment: String,
    dateTime: {type: Date, required: true},
    location: {
			type: { type: String, enum: ['Point'], required: true},
			coordinates: {
				type: [Number],
				required: true
			}
		},
		
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });


advertisementSchema.index({'location': '2dsphere'});
advertisementSchema.plugin(mongoosePaginate);
advertisementSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true});

mongoose.model('Advertisement', advertisementSchema);
