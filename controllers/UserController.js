const User = require("../models/User");

const userController = {};

userController.getAll = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(
            {
                success: true,
                message: 'Get all users retrieved succsessfully',
                data: users
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieving users',
                error: error.message
            }
        )
    }
};

userController.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json(
                {
                    success: true,
                    message: "User not found",
                    data: []
                }
            ); 
        }

        return res.status(200).json(
            {
                success: true,
                message: "User found",
                data: user
            }
        );
    } catch (error) {
        if(error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    message: "User not found"
                }
            );
        };

        return res.status(500).json(
            {
                success: false,
                message: "Error finding user",
                error: error?.message || error
            }
        );
    }
};

module.exports = userController;

