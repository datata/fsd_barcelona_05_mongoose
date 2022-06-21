const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const userRoutes = require('./routes/user.routes')

const app = express();

//middleware
app.use(express.json());

const port = process.env.PORT || 4000;

//routes
app.use('/api', userRoutes);

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
    