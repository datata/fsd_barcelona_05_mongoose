const User = require("../models/User");
const bcrypt = require('bcrypt');

const authController = {};

authController.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // codificar password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;

        // PASSWORD CODE VALIDATION
        if(password.length < 6 || password.length > 10) {
            return res.status(500).json(
                {
                    success: false,
                    message: 'Password is shorter than 6 characters'
                }
            )
        };

        const newUser = {
            name,
            email,
            password: encryptedPassword
        };

        await User.create(newUser);

        return res.status(200).json(
            {
                success: true,
                message: 'Create user successfully'
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error creating user',
                error: error?.message || error
            }
        )
    }
};

module.exports = authController;