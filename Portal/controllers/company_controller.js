const Companywise = require('../models/Companywise');
const mongoose=require('mongoose');
exports.createCompany = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/College_Database');
    const { company, eligibility,rounds,package } = req.body;

    const newCompanywise = new Companywise({
      company,
      eligibility,
      rounds,
      package
    });

    await newCompanywise.save();

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating Companywise data' });
  }
};
