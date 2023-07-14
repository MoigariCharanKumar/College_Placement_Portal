const Companywise = require('../models/Companywise');
const mongoose=require('mongoose');
exports.createCompany = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
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
