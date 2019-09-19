const mongoose = require('mongoose');

module.exports =  async function() {
  console.log('exitTestEnv')
  //await global.__SERVER.close();
  await mongoose.connection.close() 
}
