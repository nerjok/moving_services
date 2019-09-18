const mongoose = require("mongoose");
const ContactList = mongoose.model("ContactList");


const subscribeUser = async (req, res) => {

  const contact_person = req.body.id
console.log('contactPErson', contact_person)
  if (contact_person == req.user._id) {
    res.status(400).send('You cannot subscribe yourself');
    return;
  }

  ContactList.create({user: req.user._id, contact_person})
             .then(succ => {
               res.send(succ);
             })
             .catch(err => {res.status(400).send(err);});
}

const contactList = async (req, res) => {

  ContactList.find({user: req.user._id})
             .populate('contact_person', 'name email')
             .then(list => {
               res.send(list)
             })
             .catch(err => {res.status(400).send(err);});
}

const unsubscribe = async (req, res) => {

  ContactList.deleteOne({_id: req.body.id})
  .then(succ => {
    ContactList.find({user: req.user._id})
    .populate('contact_person', 'name email')
    .then(list => {
      res.send(list)
    })
    .catch(err => {res.status(400).send(err);});
  })
  .catch(err => {res.status(400).send(err);});

}
module.exports = {
                  subscribeUser,
                  contactList,
                  unsubscribe
                }
