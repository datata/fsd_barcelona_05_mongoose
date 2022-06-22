const authController = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login)

module.exports = router;