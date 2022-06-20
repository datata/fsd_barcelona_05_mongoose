const express = require('express');
require('dotenv').config();
const db = require('./config/database');

const app = express();

const port = process.env.PORT || 4000;

//routes
app.get('/', (req, res) => {
    return res.send('Bienevenidos a mi aplicacion de tareas');
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