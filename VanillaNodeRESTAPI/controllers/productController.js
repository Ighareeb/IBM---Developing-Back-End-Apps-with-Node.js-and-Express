//handle Routing Logic and interact with model data
const Product = require('../productModels');
const { getPostData } = require('../utils.js');
//note:async because model function returns a promise
//GET all products /api/products
async function getProducts(req, res) {
	try {
		const products = await Product.findAll();
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}
//GET product by id /api/products/:id
async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);
		if (!product) {
			res.writeHead(404, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
}
//POST new product /api/products
// async function createProduct(req, res) {
// 	try {
// 		//---------------------
// 		// const product = {
// 		// 	title: 'test static product',
// 		// 	description: 'test inserting static product',
// 		// 	price: 100,
// 		// 	//generate id with uuid package in productModels.js
// 		// };
// 		//---------------------
// 		//use body of req instead of static/hardcoded new product data
// 		let body = '';
// 		//.on is method to listen for events, param1 (data event in this case) which is emitted when a 'chunk' of the req body has been received.
// 		//test by adding body with props in POST req
// 		req.on('data', (chunk) => {
// 			//chunk returns a buffer containing the received data
// 			body += chunk.toString(); //convert buffer to string
// 		});
// 		req.on('end', async () => {
// 			const { title, description, price } = JSON.parse(body); //destructure body of req body of product

// 			const product = {
// 				title,
// 				description,
// 				price,
// 			};
// 			const newProduct = await Product.create(product);
// 			res.writeHead(201, { 'Content-type': 'application/json' });
// 			return res.end(JSON.stringify(newProduct));
// 		});
// 		//note - a buffer class provides way to work with diff kinds of binary data. Used to read/write data to streams, manipulate binary data from files and handle data from network protocols. It is global obj so dont need to import with require

// 		// placed inside req.on after adding logic to serve non-static files
// 		// const newProduct = await Product.create(product);
// 		// res.writeHead(201, { 'Content-type': 'application/json' });
// 		// return res.end(JSON.stringify(newProduct));
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
//---------------------------------------
////POST new product /api/products - refactored using utils functions
async function createProduct(req, res) {
	try {
		const body = await getPostData(req);
		const { title, description, price } = JSON.parse(body);
		const product = {
			title,
			description,
			price,
		};
		const newProduct = await Product.create(product);
		res.writeHead(201, { 'Content-type': 'application/json' });
		return res.end(JSON.stringify(newProduct));
	} catch (err) {
		console.log(err);
	}
}
//PUT update product /api/products/:id
async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			const body = await getPostData(req);

			const { id, title, description, price } = JSON.parse(body);

			const productData = {
				title: title || product.title, //OR is added so we don't need to send all props to update specific one
				description: description || product.description,
				price: price || product.price,
			};

			const updatedProduct = await Product.update(id, productData);
			res.writeHead(200, { 'content-type': 'application/json' });

			return res.end(JSON.stringify(updatedProduct));
		}
	} catch (err) {
		console.log(err);
	}
}
////DELETE product /api/products/:id
async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id);
		if (!product) {
			res.write(404, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ message: 'Product Not Found' }));
		} else {
			await Product.remove(id);
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ message: `Product ${id} was deleted` }));
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
