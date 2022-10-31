if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));

//routes
const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/directory');

//settings, views, layout
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//route handlers ? *
app.use('/', indexRouter);
app.use('/games', gamesRouter);

//Search up about process.env.PORT
app.listen(process.env.PORT || 3000);