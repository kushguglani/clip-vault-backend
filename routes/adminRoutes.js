const express = require('express');
const User = require('../models/User');
const Entry = require('../models/Entry');
const Tag = require('../models/Tag');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();
router.use(protect, adminOnly);

// DELETE all users
router.delete('/users', async (req, res) => {
  await User.deleteMany({ isAdmin: false }); // keep admin(s)
  res.json({ message: 'All non-admin users deleted' });
});

// DELETE all entries
router.delete('/entries', async (req, res) => {
  await Entry.deleteMany({});
  res.json({ message: 'All entries deleted' });
});

// DELETE all tags
router.delete('/tags', async (req, res) => {
  await Tag.deleteMany({});
  res.json({ message: 'All tags deleted' });
});

// DROP entire collection
router.delete('/drop/:collection', async (req, res) => {
  try {
    await req.app.locals.db.dropCollection(req.params.collection);
    res.json({ message: `${req.params.collection} collection dropped` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to drop collection', error: err.message });
  }
});

module.exports = router;
