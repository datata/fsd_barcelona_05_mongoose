const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const User = require('./models/User');
const userRoutes = require('./routes/user.routes')

const app = express();

//middleware
app.use(express.json());

const port = process.env.PORT || 4000;

//routes
app.use('/api', userRoutes);

app.post('/users', async (req, res) => {
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

app.get('/', (req, res) => {
    return res.send('Bienevenidos a mi aplicacion de tareas');
});

app.get('*', (req, res) => {
    return res.status(404).send('404 route not found');
});

db()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running: ' + port);
        });
    })
    .catch((error) => {
        console.log("Error Connecting to mongoDB", error);
    });