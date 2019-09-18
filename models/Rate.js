const mongoose = require('mongoose'); 
const { Schema } = mongoose;

var ratesSchema = new mongoose.Schema({
  rate_for: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  rate_from: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  message_thread_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'MessageThread', 
    required: true 
  },
  message: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  }
}, { timestamps: true });


module.exports = mongoose.model('Rate', ratesSchema);
