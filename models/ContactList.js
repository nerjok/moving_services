const mongoose = require('mongoose');
const { Schema } = mongoose;


var contactListSchema = new mongoose.Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  contact_person: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  message: {
    type: String,
  }
}, { timestamps: true });



contactListSchema.index({user: 1,  contact_person: 1}, {unique: true});

module.exports = mongoose.model('ContactList', contactListSchema);
