const app = require('../../index');
const {server2}  = app;

module.exports =  function() {
  console.log('setingUpTestEnv', process.env.PUBLIC_URL, process.env.NODE_ENV)
  global.__APP = app;
  global.__SERVER = server2;
  //global.__SERVER =  app.listen(5000);
}
