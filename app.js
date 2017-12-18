const express = require('express');
const app = express();

const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./controllers/index');
const mail = require('./controllers/mail');
const success = require('./controllers/success');

app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/success', success);
app.use('/mail', mail);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

app.listen(5000, function () {
    console.log('listening on http://localhost:5000');
});
