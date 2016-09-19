const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  expressValidator = require('express-validator'),
  flash = require('connect-flash'),
  session = require('express-session'),
  passport = require('passport'),
  cookieParser = require('cookie-parser'),
  LocalStrategy = require('passport-local').Strategy;


// Database settings
const config = require('./app/config/settings');

mongoose.connect(config.mongodb);
const db = mongoose.connection;


// Init App
const app = express();
const viewPath = path.join(__dirname, '/app/views');
const hbConfig = {
  layoutsDir: path.join(viewPath, 'layouts'),
  defaultLayout: 'layout'
};

// View Engine
app.set('views', viewPath);
app.engine('handlebars', exphbs(hbConfig));
app.set('view engine', 'handlebars');

// Middleware
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'app/public')));

// Express Session
app.use(session({
    secret: '0_v7^^JxCcUJLGNeYf6l',
    name: 'SessionID',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true,        // Use in production. Send session cookie only over HTTPS
        httpOnly: true,
    }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  },
  customValidators: {
    checkLength: function(value) {
        return value.length >= 8;
    }
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Starting with express

const index = require('./app/routes/index');
const login = require('./app/routes/login');
const update = require('./app/routes/update');
const download = require('./app/routes/download');

app.use('/', index);
app.use('/application', login);
app.use('/update', update);
app.use('/download', download);

// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port'));
});
