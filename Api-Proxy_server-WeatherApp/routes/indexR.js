const url = require('url'); //will use built-in node module to pass client query params to server API
const express = require('express');
const router = express.Router();
const needle = require('needle'); //lightweight HTTP client (eg use for API calls and dealing with res) - returns Promise
const apicache = require('apicache'); //use to temporarily cache/store API call results (define time) before making new req to API
//env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//Init cache - check headers res cache-control --> max-age (in this case == 2 min == 120s)
let cache = apicache.middleware;

//create route
router.get('/', cache('2 minutes'), async (req, res) => {
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
