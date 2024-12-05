const express = require('express');
const Reminder = require('../models/Reminder');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware**
const router = express.Router();

// POST: Create a reminder
// router.post('/', async (req, res) => {
//   try {
//     const reminder = new Reminder(req.body);
//     const savedReminder = await reminder.save();
//     console.log('Request Body:', req.body);
//     console.log('POST /api/reminders hit');
//     res.status(201).json(savedReminder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.post('/', protect, async (req, res) => {
    try {
      const reminder = new Reminder({
        ...req.body,
        user: req.user.id, // Associate the reminder with the logged-in user
      });
      const savedReminder = await reminder.save();
      console.log('Request Body:', req.body);
      res.status(201).json(savedReminder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// GET: Fetch all reminders
// router.get('/', async (req, res) => {
//   try {
//     const reminders = await Reminder.find();
//     res.status(200).json(reminders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.get('/', protect, async (req, res) => {
    try {
      const reminders = await Reminder.find({ user: req.user.id }); // Fetch reminders only for the logged-in user
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// PUT: Update a reminder
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedReminder = await Reminder.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedReminder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.put('/:id', protect, async (req, res) => {
    try {
      const updatedReminder = await Reminder.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id }, // Ensure the reminder belongs to the logged-in user
        req.body,
        { new: true }
      );
      if (!updatedReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
      res.status(200).json(updatedReminder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// DELETE: Delete a reminder
// router.delete('/:id', async (req, res) => {
//     try {
//       const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
//       if (!deletedReminder) {
//         return res.status(404).json({ message: 'Reminder not found' }); // If no reminder found
//       }
//       res.status(200).json({
//         message: 'Reminder deleted',
//         reminder: deletedReminder, // Include the deleted reminder
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message }); // Handle server errors
//     }
//   });
router.delete('/:id', protect, async (req, res) => {
    try {
      const deletedReminder = await Reminder.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id, // Ensure the reminder belongs to the logged-in user
      });
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
      res.status(200).json({
        message: 'Reminder deleted',
        reminder: deletedReminder,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
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