const express = require('express');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')

require('./models/Advertisement')
require('./models/User');
require('./models/Survey')
require('./services/passport');
const flash        = require('connect-flash');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

mongoose.connection.on('connected', function(){console.log('conected')});
mongoose.connection.on('error', function (err) {console.warn('err', err);});

const app = express();
app.use(flash())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));//proxy body

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

/*
var multer = require('multer');
var upload = multer();
app.use(upload.array()); 
*/

// docker run -p 27017:27017 -d mongo
/*
app.get('/', (req, res) => {
    res.send({hi: "there"});
})
npm run dev
*/

const advertisementsRoutes = require('./routes/advertisementRoutes');
app.use('/', advertisementsRoutes)

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app)
require('./routes/userRoutes')(app)
//require('./routes/advertisementsRoutes')(app)



app.use('/public', express.static(__dirname + '/public'));
//app.use('/uploads', express.static(path.join(__dirname, 'public')))
//app.use('/uploads', express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path');

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const PORT = process.env.PORT || 5000
app.listen(PORT);


// git push heroku master