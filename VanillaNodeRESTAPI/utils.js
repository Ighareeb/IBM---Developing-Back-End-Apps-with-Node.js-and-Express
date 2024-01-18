const fs = require('fs');

function writeDataToFile(filename, content) {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (error) => {
		if (err) {
			console.log(error);
		}
	});
}
module.exports = {
	writeDataToFile,
};
