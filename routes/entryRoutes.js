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
