const express = require("express");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./models/Advertisement");
require("./models/User");
require("./models/Survey");
require("./services/passport");
require('./models/MessageThread');
require('./models/Message');
const flash = require("connect-flash");

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI, { 
																	useNewUrlParser: true,  
																	useCreateIndex: true,
																	useFindAndModify: false
                                                                });
//mongoose.set('debug', true)

mongoose.connection.on("connected", function () {
    console.log("conected");
});
mongoose.connection.on("error", function (err) {
    console.warn("err", err);
});

const app = express();
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

// docker run -p 27017:27017 -d mongo

const advertisementsRoutes = require("./routes/advertisementRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/", advertisementsRoutes);
app.use("/", userRoutes);

require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

app.use("/public", express.static(__dirname + "/public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");

    app.get("*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

module.exports = app;
module.exports.server2 = server;
