const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new course
router.post('/', async (req, res) => {
  try {
    const { title, description, instructor, price, duration, category } = req.body;

    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      duration,
      category,
    });

    await newCourse.save();

    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;