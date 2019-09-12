const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const messageThreadSchema = new mongoose.Schema({
  advertisement_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Advertisement', 
      //unique: true,
      //index:true
    },
    message: {
        type:String,
        required:true,
    },
    sender_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    receiver_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

messageThreadSchema.index({advertisement_id: 1, receiver_id: 1}, {unique: true});
module.exports = mongoose.model('MessageTread', messageThreadSchema);
