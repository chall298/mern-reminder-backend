const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

// Create a new reminder
router.post('/', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    const savedReminder = await reminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reminders
router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a reminder
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

// Delete a reminder
router.delete('/:id', async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
