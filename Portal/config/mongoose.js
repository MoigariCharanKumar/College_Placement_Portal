const mongoose = require('mongoose');
console.log('came');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true,bufferTimeoutMS: 30000}, (err)=>{
    if(err)
        console.log('Error connecting to database', err);
    else
        console.log('Connected to database');
});

module.exports = mongoose
