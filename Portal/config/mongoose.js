const mongoose = require('mongoose');
console.log('came');
mongoose.connect('mongodb://127.0.0.1:27017/College_Database', {useNewUrlParser: true, useUnifiedTopology: true,bufferTimeoutMS: 30000}, (err)=>{
    if(err)
        console.log('Error connecting to database', err);
    else
        console.log('Connected to database');
});

module.exports = mongoose
