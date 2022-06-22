const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        if (password.length < 6 || password.length > 10) {
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

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validación de lo que me llega por body
        if(!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email and password are required'
                }
            ); 
        };

        const user = await User.findOne({email: email});
        
        if(!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );  
        };  
        
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );  
        };

        const token = jwt.sign({user_id : user._id, user_role: user.role}, process.env.JWT_SECRET, { expiresIn: '5h' });

        return res.status(200).json(
            {
                success: true,
                message: 'User Logged',
                token: token
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'User Login failed'
            }
        );
    }
}

module.exports = authController;