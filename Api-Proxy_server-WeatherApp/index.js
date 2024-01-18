const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); //prevent spamming of endpoint check X-RateLimit in Headers res
require('dotenv').config();
const router = require('./routes/indexR');
const PORT = process.env.PORT || 5000;

const app = express();

//Rate limiting using middleware
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, //10 min
	max: 5, //max 5 requests per 10 min
});
app.use(limiter);
app.set('trust proxy', 1);
//routes
app.use('/api', router);
//enable cors(cross-origin resource sharing) in express - acts as a connect/express middleware that adds CORS headers to res and tell browser which domains are allowed to access resources and what methods they can use
app.use(cors());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
