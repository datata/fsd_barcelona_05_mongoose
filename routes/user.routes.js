const User = require('../models/User');

const router = require('express').Router();

router.get('/users', async (req, res) => {
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
});

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;

        // PASSWORD CODE VALIDATION
        // if(password.length < 6) {
        //     return res.status(500).json(
        //         {
        //             success: false,
        //             message: 'Password is shorter than 6 characters'
        //         }
        //     )
        // }

        const newUser = {
            name, 
            email,
            password
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
});

module.exports = router;