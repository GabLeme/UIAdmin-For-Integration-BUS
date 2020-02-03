const express               = require('express');
const bodyParser            = require('body-parser');
const app                   = express();
const Routes                = require('./core/routes');
const Cors                  = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors());
Routes(app);

module.exports = app;
