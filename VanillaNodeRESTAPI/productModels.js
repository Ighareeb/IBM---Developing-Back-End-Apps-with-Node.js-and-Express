//handle CRUD operations on the data

const { v4: uuidv4 } = require('uuid'); //to generate id for new products
const products = require('./data/products.json');
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
module.exports = {
	findAll,
	findById,
	create,
};
