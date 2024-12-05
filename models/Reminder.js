const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
//   description: { type: String },
description: { type: String, required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
