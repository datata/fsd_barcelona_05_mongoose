const router = require('express').Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.getAll);
router.get('/users/:id', userController.getUserById);

module.exports = router;