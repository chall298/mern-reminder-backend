const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

// POST: Create a reminder
router.post('/', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    const savedReminder = await reminder.save();
    console.log('Request Body:', req.body);
    console.log('POST /api/reminders hit');
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Fetch all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a reminder
router.put('/:id', async (req, res) => {
  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a reminder
router.delete('/:id', async (req, res) => {
    try {
      const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder not found' }); // If no reminder found
      }
      res.status(200).json({
        message: 'Reminder deleted',
        reminder: deletedReminder, // Include the deleted reminder
      });
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server errors
    }
  });
  

module.exports = router;

// router.delete('/:id', async (req, res) => {
//     try {
//       await Reminder.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: 'Reminder deleted' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });