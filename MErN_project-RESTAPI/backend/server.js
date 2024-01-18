const express = require('express'); //BE web framework
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
