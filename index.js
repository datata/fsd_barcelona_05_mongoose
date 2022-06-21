const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const User = require('./models/User');

const app = express();

const port = process.env.PORT || 4000;

//routes
app.get('/users', async (req, res) => {
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

app.post('/users', (req, res) => {
    return res.status(200).json(
        {
            succes: true,
            message: 'Create user successfully'
        }
    )
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