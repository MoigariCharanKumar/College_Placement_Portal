// companiesRoute.js
const express = require('express');
const router = express.Router();

// Sample company data
// Sample company data
const companies = [
  {
    id: 1,
    name: 'Amazon',
    summary: 'Amazon is a multinational technology company founded by Jeff Bezos in 1994. It started as an online marketplace for books and expanded to become one of the largest e-commerce platforms in the world.',
    description: 'Amazon is a multinational technology company founded by Jeff Bezos in 1994. It started as an online marketplace for books and expanded to become one of the largest e-commerce platforms in the world. Headquartered in Seattle, Washington, Amazon offers a wide range of products and services, including cloud computing, artificial intelligence, streaming services, and consumer electronics. With a workforce of over 1,298,000 employees globally, Amazon operates in various sectors such as retail, technology, entertainment, and logistics. The company is known for its customer-centric approach and innovative solutions. It provides job opportunities in various roles, including:',
    jobRoles: [
      {
        role: 'Software Engineer',
        skills: ['Java', 'Python', 'C++', 'JavaScript', 'Cloud Computing'],
        averageSalary: '$120,000'
      },
      {
        role: 'Data Scientist',
        skills: ['Python', 'R', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
        averageSalary: '$130,000'
      },
      {
        role: 'Operations Manager',
        skills: ['Supply Chain Management', 'Logistics', 'Process Optimization', 'Inventory Management'],
        averageSalary: '$110,000'
      },
      {
        role: 'Marketing Specialist',
        skills: ['Digital Marketing', 'SEO', 'Social Media Management', 'Marketing Analytics'],
        averageSalary: '$100,000'
      }
    ],
    jobApplicationLink: 'https://www.amazon.jobs/'
  },
  {
    id: 2,
    name: 'Google',
    summary: 'Google is a multinational technology company founded by Larry Page and Sergey Brin in 1998. It specializes in Internet-related services and products, including search engines, online advertising technologies, cloud computing, software, and hardware.',
    description: 'Google is a multinational technology company founded by Larry Page and Sergey Brin in 1998. It specializes in Internet-related services and products, including search engines, online advertising technologies, cloud computing, software, and hardware. Headquartered in Mountain View, California, Google has a strong presence worldwide and is known for its innovative culture and cutting-edge technology solutions. With a workforce of around 135,301 employees, Google offers diverse career opportunities in various roles, including:',
    jobRoles: [
      {
        role: 'Software Engineer',
        skills: ['Python', 'Java', 'C++', 'JavaScript', 'Web Development'],
        averageSalary: '$150,000'
      },
      {
        role: 'Product Manager',
        skills: ['Product Strategy', 'Market Analysis', 'User Research', 'Agile Methodologies'],
        averageSalary: '$160,000'
      },
      {
        role: 'UX/UI Designer',
        skills: ['User-Centered Design', 'Wireframing', 'Prototyping', 'Usability Testing'],
        averageSalary: '$140,000'
      },
      {
        role: 'Data Analyst',
        skills: ['SQL', 'Data Visualization', 'Statistical Analysis', 'Machine Learning'],
        averageSalary: '$120,000'
      }
    ],
    jobApplicationLink: 'https://careers.google.com/'
  },
  {
    id: 3,
    name: 'Microsoft',
    summary: 'Microsoft Corporation is a multinational technology company founded by Bill Gates and Paul Allen in 1975. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Microsoft is known for its operating systems, such as Windows, and productivity software like Microsoft Office. With a global workforce of over 166,475 employees, Microsoft offers career opportunities in various roles, including:',
    description: 'Microsoft Corporation is a multinational technology company founded by Bill Gates and Paul Allen in 1975. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Microsoft is known for its operating systems, such as Windows, and productivity software like Microsoft Office. Headquartered in Redmond, Washington, Microsoft has a diverse portfolio of products and services, including Azure cloud computing, Xbox gaming consoles, Surface devices, and LinkedIn professional networking platform. With a global workforce of over 166,475 employees, Microsoft offers career opportunities in various roles, including:',
    jobRoles: [
      {
        role: 'Software Engineer',
        skills: ['C#', 'C++', 'Java', 'JavaScript', 'Cloud Computing'],
        averageSalary: '$140,000'
      },
      {
        role: 'Data Scientist',
        skills: ['Python', 'R', 'Machine Learning', 'Data Analysis', 'Big Data'],
        averageSalary: '$150,000'
      },
      {
        role: 'Product Manager',
        skills: ['Product Strategy', 'Market Research', 'Agile Methodologies', 'Data-driven Decision Making'],
        averageSalary: '$160,000'
      },
      {
        role: 'Cybersecurity Analyst',
        skills: ['Network Security', 'Vulnerability Assessment', 'Incident Response', 'Security Operations'],
        averageSalary: '$130,000'
      }
    ],
    jobApplicationLink: 'https://careers.microsoft.com/'
  }
  // Add more companies to the array
];


// GET route for the "About Companies" page
const Student = require('../models/Student');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGODB_URL);
  const studentId = req.query.id; // Get the student ID from the query parameter

  try {
    // Retrieve the student record from the database using the student ID
    const student = await Student.findById(studentId);

    if (student) {
      res.render('aboutcompanies', { student, companies});
    } else {
      res.send('Invalid student ID');
    }
  } catch (error) {
    console.error('Error retrieving student:', error);
    // Handle the error and send an appropriate response
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
