const express               = require('express');
const bodyParser            = require('body-parser');
const app                   = express();
const Routes                = require('./core/routes');
const Cors                  = require('cors');
const multer                = require('multer');
const fileUpload            = require('express-fileupload')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use(Cors());
Routes(app);

module.exports = app;
