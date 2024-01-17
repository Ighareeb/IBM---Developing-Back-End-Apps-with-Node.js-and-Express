const http = require('http');
const { getProducts, getProduct } = require('./controllers/productController');
// // example 1
// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-type', 'text/html');
// 	res.write('<h1>Hello World</h1>'); //write to body
// 	res.end();
// });
//------------------------------------------------------
// //example 2 -
// const server = http.createServer((req, res) => {
// 	//set up an endpoint for GET req
// 	if (req.url === '/api/products' && req.method === 'GET') {
// 		res.writeHead(200, { 'Content-type': 'application/json' });
// 		console.log(typeof products); //because imported it automatically gets parsed into JS object so we need to change it back to JSON
// 		res.end(JSON.stringify(products)); //shorten by not using .write as .end used to signal that message is complete
// 	} else {
// 		res.writeHead(404, { 'Content-type': 'application/json' });
// 		res.end(JSON.stringify({ message: 'Route not found' }));
// 	}
// });
//------------------------------------------------------
//example 3 - note instead of setting up all routes with conditionals create productModel.js (CRUD) and controller.js (Route logic)
const server = http.createServer((req, res) => {
	if (req.url === '/api/products' && req.method === 'GET') {
		getProducts(req, res);
	} else if (
		req.url.match(/\/api\/products\/([0-9]+)/) &&
		req.method === 'GET'
	) {
		const id = req.url.split('/')[3]; // (api/products/id we want id so use split)
		getProduct(req, res, id);
	} else {
		res.writeHead(404, { 'Content-type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
