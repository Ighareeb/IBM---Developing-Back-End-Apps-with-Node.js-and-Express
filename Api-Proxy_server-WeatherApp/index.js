const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/indexR');
const PORT = process.env.PORT || 5000;

const app = express();
//enable cors(cross-origin resource sharing) in express - acts as a connect/express middleware that adds CORS headers to res and tell browser which domains are allowed to access resources and what methods they can use
app.use(cors());

//routes
app.use('/api', router);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
