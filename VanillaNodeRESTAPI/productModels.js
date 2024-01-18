//handle CRUD operations on the data

const { v4: uuidv4 } = require('uuid'); //to generate id for new products
let products = require('./data/products.json');
const { writeDataToFile } = require('./utils.js'); //utility functions using fs module package
function findAll() {
	return new Promise((resolve, reject) => {
		resolve(products);
	});
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id);
		resolve(product);
	});
}

function create(product) {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		products.push(newProduct);
		//update JSON file using utility function (check util.js)
		writeDataToFile('./data/products.json', products);
		resolve(newProduct);
	});
}

function update(product, id) {
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === id);
		products[index] = { id, ...product };
		if (process.env.NODE_ENV !== 'test') {
			writeDataToFile('./data/products.json', products);
		}
		resolve(products[index]);
	});
}
function remove(product, id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id);
		if (process.env.NODE_ENV !== 'test') {
			writeDataToFile('./data/products.json', products);
		}
		resolve();
	});
}
module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
};
