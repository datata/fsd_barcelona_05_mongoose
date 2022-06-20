const express = require('express');
const mongoose = require('mongoose');

const app = express();

//routes
app.get('/', (req, res) =>{
    return res.send('Bienevenidos a mi aplicacion de tareas');
});

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => {
    console.log('Connection stablished');
})
.catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

app.listen(3000, () => {
    console.log('Server is running');
});