const express = require('express');
const routes = require('./routes/users.js');

const app = express();
const PORT = 5000;

app.use(express.json()); //uses middleware to handle the request as json object

app.use('/user', routes); //define endpoint

app.listen(PORT, () => console.log('Server is running at port ' + PORT));
