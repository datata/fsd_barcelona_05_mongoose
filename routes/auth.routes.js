const authController = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/auth/register', authController.register);

module.exports = router;