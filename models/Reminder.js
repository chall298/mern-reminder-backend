const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
