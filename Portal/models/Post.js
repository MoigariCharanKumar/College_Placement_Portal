const mongoose = require('mongoose');

// Define the student schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rounds:{
    type:Number,
    required:true
  },
    package:{
      type:String,
      required:true
    },
  deadline: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  companycontact: {
    type: String,
    required: true
  }
});

// Create the post model
const Post = mongoose.model('Post', postSchema);

// Export the post model
module.exports = Post;
