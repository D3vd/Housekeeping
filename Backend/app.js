const express = require('express');
const logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var databaseConfig = require('./config/database');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.url, { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

require('./app/routes/routes')(app);

app.listen(process.env.PORT || 8080);
console.log('App listening on port 8080');
