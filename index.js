const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;

//routes
app.get('/', (req, res) =>{
    return res.send('Bienevenidos a mi aplicacion de tareas');
});

//connection to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connection stablished');
})
.catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

app.listen(port, () => {
    console.log('Server is running: ' + port);
});