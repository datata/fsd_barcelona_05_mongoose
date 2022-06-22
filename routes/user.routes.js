const router = require('express').Router();
const userController = require('../controllers/UserController');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', verifyToken, isSuperAdmin, userController.getAll);
router.get('/users/:id', verifyToken, isSuperAdmin, userController.getUserById);

module.exports = router;