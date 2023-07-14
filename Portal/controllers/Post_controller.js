const Post = require('../models/Post');
const mongoose=require('mongoose');
exports.createPost = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { title, company, branch, description, rounds,package,deadline, link, companycontact } = req.body;

    // Check if all required fields are provided


    // Create a new post instance
    const post = new Post({
      title,
      company,
      branch,
      description,
      rounds,
      package,
      deadline,
      link,
      companycontact,
    });

    // Save the post to the database
    await post.save();

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the post' });
  }
};
