const url = require('url'); //will use built-in node module to pass client query params to server API
const express = require('express');
const router = express.Router();
const needle = require('needle'); //lightweight HTTP client (eg use for API calls and dealing with res) - returns Promise

//env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
//create route
router.get('/', async (req, res) => {
	try {
		// console.log(url.parse(req.url, true).query);
		const params = new URLSearchParams({
			[API_KEY_NAME]: API_KEY_VALUE,
			...url.parse(req.url, true).query,
		});

		const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
		const data = await apiRes.body;
		//Log the req + query made by client to the public api when in production more
		if (process.env.NODE_ENV !== 'production') {
			console.log(`REQUEST: ${API_BASE_URL}?${params}`);
		}

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
