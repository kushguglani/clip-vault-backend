const Entry = require('../models/Entry');
const Tag = require('../models/Tag');

exports.getEntries = async (req, res) => {
  const entries = await Entry.find({ userId: req.user.id }).populate("tags", "name");
  res.json(entries);
};

exports.createEntry = async (req, res) => {
  try {
    const { title, label, value, tags = [] } = req.body;
    // Tag processing
    const tagIds = [];
    for (let tagName of tags) {
      const existing = await Tag.findOne({ name: new RegExp(`^${tagName}$`, 'i') });
      if (existing) {
        tagIds.push(existing._id);
      } else {
        const newTag = await Tag.create({ name: tagName });
        tagIds.push(newTag._id);
      }
    }
    const newEntry = new Entry({
      label,
      title,
      value,
      tags: tagIds,
      userId: req.user.id,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Entry creation failed:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { title,label, value, tags = [] } = req.body;

    // Normalize tag values and filter empty ones
    const tagNames = (tags || []).map(t => t.trim()).filter(Boolean);
    const tagIds = [];

    for (const name of tagNames) {
      const existingTag = await Tag.findOne({ name: new RegExp(`^${name}$`, 'i') });

      if (existingTag) {
        tagIds.push(existingTag._id);
      } else {
        const newTag = await Tag.create({ name });
        tagIds.push(newTag._id);
      }
    }

    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, label, value, tags: tagIds },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found or unauthorized' });
    }

    res.json(updatedEntry);
  } catch (error) {
    console.error("Update Entry Error:", error);
    res.status(500).json({ message: 'Server error while updating entry' });
  }
};

exports.deleteEntry = async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
};
