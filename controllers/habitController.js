const Habit = require('../models/Habit');

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ userId: req.userId });
  res.json(habits);
};

exports.addHabit = async (req, res) => {
  const habit = await Habit.create({ userId: req.userId, name: req.body.name });
  res.status(201).json(habit);
};

exports.markDone = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const today = new Date().toDateString();
  const last = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null;
  if (last === today) return res.status(400).json({ error: 'Ya marcado hoy' });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (last === yesterday.toDateString()) {
    habit.streak++;
  } else {
    habit.streak = 1;
  }
  habit.lastCompleted = new Date();
  await habit.save();
  res.json(habit);
};
