const router = require('express').Router();
const userController = require('../controllers/UserController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', verifyToken, userController.getAll);
router.get('/users/:id', verifyToken, userController.getUserById);

module.exports = router;