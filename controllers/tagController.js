const Tag = require('../models/Tag');

exports.getTags = async (req, res) => {
  const tags = await Tag.find({});
  res.json(tags);
};

exports.createTag = async (req, res) => {
  const { name } = req.body;
  const existing = await Tag.findOne({ name });
  if (existing) return res.status(400).json({ message: 'Tag already exists' });

  const tag = await Tag.create({ name });
  res.status(201).json(tag);
};
