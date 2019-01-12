const express = require('express');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
require('./models/User');
require('./services/passport');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

mongoose.connection.on('connected', function(){console.log('conected')});
mongoose.connection.on('error', function (err) {console.warn('err', err);});

const app = express();

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

// docker run -p 27017:27017 -d mongo
app.get('/', (req, res) => {
    res.send({hi: "there"});
})



require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path');\
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT);
