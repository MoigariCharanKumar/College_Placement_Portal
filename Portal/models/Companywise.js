const mongoose = require('mongoose');

// Define the student schema
const eventCompany = new mongoose.Schema({
    company: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  }

  }
);

// Create the post model
const Companywise = mongoose.model('Company', eventCompany);

// Export the post model
module.exports = Companywise;
