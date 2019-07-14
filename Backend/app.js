const express = require('express');
const logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');

var app = express();

var databaseConfig = require('./config/database');

app.use(logger('dev'));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.url, { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.listen(process.env.PORT || 8080);
console.log('App listening on port 8080');
