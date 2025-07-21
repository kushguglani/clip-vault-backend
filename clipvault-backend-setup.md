Perfect! Let’s start with the backend setup for **ClipVault**.

---

## 🔧 Step 1: Backend Setup with Node.js, Express, MongoDB, Mongoose, JWT

### ✅ Features in This Step:

* Basic Express server
* MongoDB connection (Mongoose)
* User model + auth routes (Register/Login)
* JWT-based authentication
* Entry model + protected CRUD routes

---

### 📁 Folder Structure:

```
server/
├── controllers/
│   ├── authController.js
│   └── entryController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Entry.js
├── routes/
│   ├── authRoutes.js
│   └── entryRoutes.js
├── .env
├── server.js
├── config.js
└── package.json
```

---

### 1. **Initialize Project**

```bash
mkdir clipvault-backend && cd clipvault-backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
```

---

### 2. **Basic Express Server (`server.js`)**

```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
```

---

### 3. **.env**

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/clipvault
JWT_SECRET=your_super_secret_key
```

---

### 4. **User Model (`models/User.js`)**

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

### 5. **Entry Model (`models/Entry.js`)**

```js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  value: String,
  tag: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Entry', entrySchema);
```

---

### 6. **Auth Controller (`controllers/authController.js`)**

```js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already used' });

  const user = await User.create({ email, password });
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id) });
};
```

---

### 7. **Entry Controller (`controllers/entryController.js`)**

```js
const Entry = require('../models/Entry');

exports.getEntries = async (req, res) => {
  const entries = await Entry.find({ userId: req.user.id });
  res.json(entries);
};

exports.createEntry = async (req, res) => {
  const { title, value, tag } = req.body;
  const entry = await Entry.create({ title, value, tag, userId: req.user.id });
  res.status(201).json(entry);
};

exports.updateEntry = async (req, res) => {
  const entry = await Entry.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(entry);
};

exports.deleteEntry = async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
};
```

---

### 8. **Middleware (`middleware/authMiddleware.js`)**

```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = { protect };
```

---

### 9. **Routes (`routes/authRoutes.js`)**

```js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

---

### 10. **Routes (`routes/entryRoutes.js`)**

```js
const express = require('express');
const { getEntries, createEntry, updateEntry, deleteEntry } = require('../controllers/entryController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/', getEntries);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;
```

---

### ✅ After This:

* You have a working backend API with full authentication and secure CRUD for entries.

---

