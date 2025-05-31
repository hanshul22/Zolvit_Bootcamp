const User = require('../model/userModel');

// CREATE user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: savedUser
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create user',
            error: err.message
        });
    }
};

// READ all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: err.message
        });
    }
};

// READ single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: 'No user found with the provided ID'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: err.message
        });
    }
};

// UPDATE user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: 'No user found with the provided ID'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update user',
            error: err.message
        });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: 'No user found with the provided ID'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: err.message
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}; 