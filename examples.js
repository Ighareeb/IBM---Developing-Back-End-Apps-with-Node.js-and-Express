// //Example - sending an HTTP request
// const http = require('http');
// let options = {
// 	host: 'w1.weather.gov',
// 	path: '/xml/current_obs/XSFO.xml',
// };
// //http.request(options, [callback]); this method returns an instance of http.ClientRequest
// //callback is called once res is receieved and passes response object
// let request = http.request(options, (res) => {
// 	let buffer = '';
// 	let result = '';
// 	//object.on() is a method used to define event listeners/handlers that gets called when event occurs
// 	res.on('data', (chunk) => {
// 		buffer += chunk;
// 	});
// 	res.on('end', () => {
// 		console.log(buffer);
// 	});
// });
// request.on('error', (err) => {
// 	console.error(err.message);
// });
// request.end();
//------------------------------------------------------------------
// //Example - Async/Await
// const axios = require('axios');

// const connectToURL = (url) => {
// 	const req = axios.get(url); //send get req; returns promise
// 	console.log(req);
// 	req
// 		.then((res) => {
// 			let listOfEntries = res.data.entries;
// 			listOfEntries.forEach((entry) => {
// 				console.log(entry.Category);
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err.message);
// 		});
// };
// console.log('Before connect URL');
// connectToURL('https://api.publicapis.org/entries');
// console.log('After connect URL');
// //Same example using async/await
// const connectToURLasync = async (url) => {
// 	const outcome = axios.get(url);
// 	let listOfEntries2 = (await outcome).data.entries;
// 	listOfEntries2.forEach((entry) => {
// 		console.log(entry.Category);
// 	});
// };
// connectToURLasync('https://api.publicapis.org/entries');
//------------------------------------------------------------------
// //Example -  simple express server
const express = require('express');
const app = express(); //create instance (obj) of express framework API
//use {app} to set up your server, define routes, and listen for incoming requests.
const port = 3000;
app.get('/', (req, req) => {
	//logic
});
//start HTTP server
let server = app.listen(port, () => {
	console.log(`Server is listening on URL http://localhost:${port}`);
});
