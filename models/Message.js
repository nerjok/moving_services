const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  message:{
    type:String,
    required:true,
    unique:false,
    //index:true,
  },
  sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message_thread_id: { type: Schema.Types.ObjectId, ref: 'MessageThread', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
