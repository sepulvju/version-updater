const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');


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

// set static folder
app.use(express.static(path.join(__dirname, 'app/public')));

// Starting with express

const index = require('./app/routes/index');
const update = require('./app/routes/update');
const download = require('./app/routes/download');

app.use('/', index);
app.use('/update', update);
app.use('/download', download);

// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port'));
});
