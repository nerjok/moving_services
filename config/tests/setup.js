const app = require('../../index');
const {server2}  = app;

module.exports =  function() {
  console.log('setingUpTestEnv', process.env.PUBLIC_URL);
  global.__APP = app;
  global.__SERVER = server2;
};
