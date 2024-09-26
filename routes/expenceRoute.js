const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenceController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/add', protect, upload.single('file'), addExpense);
router.get('/', protect, getExpenses);
router.patch('/:id', protect, updateExpense);
router.delete('/', protect, deleteExpense);

module.exports = router;
