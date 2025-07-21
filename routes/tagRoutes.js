const express = require('express');
const { createTag, getTags } = require('../controllers/tagController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', getTags);
router.post('/', createTag);

module.exports = router;
