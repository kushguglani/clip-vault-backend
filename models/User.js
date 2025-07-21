const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false } 
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
