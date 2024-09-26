const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/user-dashboard', protect, (req, res) => {
  res.send('Welcome to the user dashboard');
});

router.get('/admin-dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard');
});

module.exports = router;
