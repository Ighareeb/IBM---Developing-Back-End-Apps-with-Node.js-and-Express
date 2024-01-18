const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

function writeDataToFile(filename, data) {
	return writeFile(filename, JSON.stringify(data, null, 2));
}
// function writeDataToFile(filename, content) {
// 	fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (error) => {
// 		if (err) {
// 			console.log(error);
// 		}
// 	});
// }

function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				resolve(body);
			});
		} catch (err) {
			reject(err);
		}
	});
}
module.exports = {
	writeDataToFile,
	getPostData,
};
