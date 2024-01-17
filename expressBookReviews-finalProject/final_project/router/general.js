const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
	//Write your code here
	return res.status(300).json({ message: 'Yet to be implemented' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
	res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
	const isbn = req.params.isbn;
	res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
	const author = req.params.author;
	const booksArray = Object.values(books);
	const booksByAuthor = booksArray.filter((book) => book.author === author);
	res.send(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
	const title = req.params.title;
	const booksArray = Object.values(books);
	const booksByTitle = booksArray.filter((book) => book.title === title);
	res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
	const isbn = req.params.isbn;
	const booksArray = Object.values(books);
	console.log('Books array:', booksArray);
	const bookExists = booksArray.find((book) => book.isbn === isbn);
	console.log('Book found:', bookExists);
	if (bookExists) {
		res.send(bookExists.reviews);
	} else {
		res.status(404).send({ message: 'Book not found' });
	}
});

//Using promises
function getBookList() {
	return new Promise((resolve, reject) => {
		resolve(books);
	});
}
//get book list
public_users.get('/', (req, res) => {
	getBookList().then(
		(book) => res.send(JSON.stringify(book, null, 4)),
		(err) => res.send(err),
	);
});
//get book details using ISBN
function getFromISBN(isbn) {
	let book = books[isbn];
	return new Promise((resolve, reject) => {
		if (book) {
			resolve(book);
		} else {
			reject('Unable to find book');
		}
	});
}
public_users.get('/isbn/:isbn', (req, res) => {
	const isbn = req.params.isbn;
	getFromISBN(isbn).then(
		(book) => res.send(JSON.stringify(book, null, 4)),
		(err) => res.send(err),
	);
});
//get book details using author
function getFromAuthor(author) {
	let output = [];
	return new Promise((resolve, reject) => {
		for (let isbn in books) {
			let book = books[isbn];
			if (book.author === author) {
				output.push(book);
			}
		}
		resolve(output);
	});
}
public_users.get('/author/:author', (req, res) => {
	const author = req.params.author;
	getFromAuthor(author).then(
		(result) => res.send(JSON.stringify(result, null, 4)),
		(err) => res.send(err),
	);
});
//get book from title
function getFromTitle(title) {
	let output = [];
	return new Promise((resolve, reject) => {
		for (let isbn in books) {
			let book = books[isbn];
			if (book.title === title) {
				output.push(book);
			}
		}
		resolve(output);
	});
}
public_users.get('/title/:title', (req, res) => {
	const title = req.params.title;
	getFromTitle(title).then(
		(result) => res.send(JSON.stringify(result, null, 4)),
		(err) => res.send(err),
	);
});
module.exports.general = public_users;
