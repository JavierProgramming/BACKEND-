const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  streak: { type: Number, default: 0 },
  lastCompleted: Date
});

module.exports = mongoose.model('Habit', habitSchema);
