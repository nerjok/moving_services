const mongoose = require("mongoose");

const Message = mongoose.model("Message");
const MessageThread = mongoose.model("MessageThread");

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

const createMessage = async (req, res, next) => {//MessageThread.syncIndexes()

  let { message_thread_id, message, receiver_id, advertisement_id } = req.body;
  advertisement_id || null

  if (receiver_id == req.user._id) {
    return res.status(400).send({
      error: 'You cannot send message youself!'
   });
  }
  const msgTread = await MessageThread.findOne({receiver_id: [req.user._id, receiver_id], sender_id: [req.user._id, receiver_id], advertisement_id: [advertisement_id]})
  
  if (msgTread) {
    message_thread_id = msgTread._id
  } else {
   const msg =  await MessageThread.create({message, receiver_id, sender_id: req.user._id, advertisement_id});
   message_thread_id = msg._id;
  }


  Message.create({ message, message_thread_id, sender_id: req.user._id })
    .then(msg => {
      res.send(msg);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};


const addMessage = async (req, res, next) => {
  let { message_thread_id, message,  } = req.body;
  const msgTread = await MessageThread.findOne({message_thread_id})

  if (msgTread) {
    message_thread_id = msgTread._id
  } 


  Message.create({ message, message_thread_id, sender_id: req.user._id })
    .then(msg => {
      MessageThread.updateOne({_id: message_thread_id}, {updatedAt: Date.now()}).then(
        res=> {console.log('upadtingRes', res)}
      )
      .catch(err => {console.log('updError', err)});
      res.send(msg);
    })
    .catch(err => {
      res.send(err);
    });
};


const createThread = async (req, res) => {
  const { advertisement_id, receiver_id, message } = req.body;//req.query;
  if (receiver_id == req.user._id) {
    return res.status(400).send({
      error: 'You cannot send message youself!'
   });
  }

  MessageThread.create({
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
};

const showMessageThreads = async (req, res) => {
  const user_id = req.user._id
  const msgThreads = await MessageThread.find({$or: [{receiver_id: user_id}, {sender_id: user_id}]})
                                       .sort({ updatedAt: -1 })
                                       .limit(50)
                                       .populate('sender_id', 'name email')
                                       .populate('receiver_id', 'name email');
                                       
  res.send(msgThreads);
}

const showThreadMessages = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  const msgThread = await MessageThread.findById(id)
                                       .populate('sender_id', 'name email')
                                       .populate('receiver_id', 'name email');
                                      //.then(res=>{console.log('thID', res)})

  Message.find({message_thread_id: id})
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('sender_id', 'name email')
    .populate('message_thread_id', 'message')
    .then(messages => {
      res.send({msgThread, messages});
    })
    .catch(err => {res.send(err)})
}

module.exports = {
  getMessages,
  createThread,
  createMessage,
  showMessageThreads,
  showThreadMessages,
  addMessage
};
