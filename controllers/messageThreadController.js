const mongoose = require("mongoose");

const Message = mongoose.model("Message");
const MessageTread = mongoose.model("MessageTread");

const getMessages = async (req, res, next) => {
  Message.create({ message: "my message", sender_id: 4, receiver_id: 4 })
    .then(msg => {
      res.send(msg);
    })
    .catch(err => {
      res.send(err);
    });

  return;

  res.send({ message: "getMessages" });
};

const createMessage = async (req, res, next) => {
  let { message_thread_id, message, receiver_id, advertisement_id } = req.body;
  const msgTread = await MessageTread.findOne({receiver_id, sender_id: req.user._id, advertisement_id: [advertisement_id, null]})
  
  //console.log('createMessage', req.body)
  console.log('msgThread', msgTread);
  if (msgTread) {
    message_thread_id = msgTread._id
  } else {
   const msg =  await MessageTread.create({message, receiver_id, sender_id: req.user._id, advertisement_id: null});
   message_thread_id = msg._id;
   console.log('msgthreadCreation', msg);
  }
  Message.create({ message, message_thread_id, sender_id: req.user._id })
    .then(msg => {
      res.send(msg);
    })
    .catch(err => {
      res.send(err);
    });
};


const addMessage = async (req, res, next) => {
  let { message_thread_id, message,  } = req.body;
  const msgTread = await MessageTread.findOne({message_thread_id})
  
  //console.log('createMessage', req.body)
  console.log('msgThread', msgTread);
  if (msgTread) {
    message_thread_id = msgTread._id
  } 

  Message.create({ message, message_thread_id, sender_id: req.user._id })
    .then(msg => {
      res.send(msg);
    })
    .catch(err => {
      res.send(err);
    });
};


const createThread = async (req, res) => {
  const { advertisement_id, sender_id, receiver_id, message } = req.body;//req.query;
console.log('query', req.body)
  MessageTread.create({
    advertisement_id,
    sender_id: req.user._id,
    receiver_id,
    message
  })
  .then(succ => {
    res.send(succ)
  })
  .catch(err => {
    res.send(err);
  });

  //res.send({ params: req.query });
};

const showMessageThreads = async (req, res) => {
  const user_id = req.user._id
  const msgThreads = await MessageTread.find({$or: [{receiver_id: user_id}, {sender_id: user_id}]})
  res.send(msgThreads);
}

const showThreadMessages = async (req, res) => {
  console.log('response entities', req.params);
  const { id } = req.params
  const user_id = req.user._id
//  , $or: [{receiver_id: user_id}, {sender_id: user_id}]
  Message.find({message_thread_id: id})
  .then(messages => {
    res.send(messages);
  })
  .catch(err => {res.send(err)})

  //res.send({resp: 'sd'});
}

module.exports = {
  getMessages,
  createThread,
  createMessage,
  showMessageThreads,
  showThreadMessages,
  addMessage
};
