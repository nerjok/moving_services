const express = require("express");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./models/ContactList");
require("./models/Rate");
require("./models/Advertisement");
require("./models/User");
require("./models/Survey");
require("./services/passport");
require('./models/MessageThread');
require('./models/Message');

const next = require('next')
const dev = (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const flash = require("connect-flash");

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI, { 
																	useNewUrlParser: true,  
																	useCreateIndex: true,
																	useFindAndModify: false
                                                                });
//mongoose.set('debug', true)



const app = express();
var  server;


app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //proxy body

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


const advertisementsRoutes = require("./routes/advertisementRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/", advertisementsRoutes);
app.use("/", userRoutes);

require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

app.use("/public", express.static(__dirname + "/public"));

//app.use("/_next", express.static(__dirname + "/.next"));



nextApp.prepare()
  .then(() => {
    const pagesRoutes = require('./routes/pagesRoutes')(nextApp);
    app.use('/', pagesRoutes);
    
    app.get('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT)
    
})
.catch((ex) => {
  console.log('ERROR', ex)
  process.exit(1)
})

module.exports = app;
module.exports.server2 = server;
