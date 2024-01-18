//handle Routing Logic and interact with model data
const Product = require('../productModels');

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
async function createProduct(req, res) {
	try {
		const product = {
			title: 'test static product',
			description: 'test inserting static product',
			price: 100,
			//generate id with uuid package in productModels.js
		};
		const newProduct = await Product.create(product);
		res.writeHead(201, { 'Content-type': 'application/json' });
		return res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}
module.exports = {
	getProducts,
	getProduct,
	createProduct,
};
