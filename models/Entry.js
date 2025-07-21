const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  value: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Entry', entrySchema);
