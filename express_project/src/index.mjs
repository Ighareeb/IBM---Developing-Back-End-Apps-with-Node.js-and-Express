import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
//returns node http.Server (express server) to start listening on port for HTTP requests
app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
