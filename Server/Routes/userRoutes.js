const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CREATE user (POST /users)
router.post('/', userController.createUser);

// READ all users (GET /users)
router.get('/', userController.getAllUsers);

// READ single user (GET /users/:id)
router.get('/:id', userController.getUserById);

// UPDATE user (PUT /users/:id)
router.put('/:id', userController.updateUser);

// DELETE user (DELETE /users/:id)
router.delete('/:id', userController.deleteUser);

module.exports = router;
