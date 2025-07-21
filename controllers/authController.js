const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already used' });

  const user = await User.create({ email, password, isAdmin });
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id) });
};
