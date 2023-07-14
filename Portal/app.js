const express=require('express')
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port=4000;

app=express()

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }));

// Add middleware for parsing JSON data
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use('/assets/uploads', express.static('assets/uploads'));
app.use('/assets/uploads', express.static(path.join(__dirname, 'assets/uploads')));
app.use('/',require('./routes/index'));
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
  