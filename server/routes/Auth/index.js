const express = require("express");
const router = express.Router();
const request = require("request");

const app = express();
const cors = require("cors");
app.use(cors())

require('dotenv').config()

const APP_ID = process.env.APP_ID;
const AUTHORIZE_URL = process.env.AUTHORIZE_URL;
const REDIRECT_URL = process.env.APP_URL;

router.get('/api/favorite', async (req, res) => {
	console.log('arimura');
	const encodedRedirectUri = encodeURI(REDIRECT_URL);
	const options = {
		url: AUTHORIZE_URL,
		method: 'GET',
		header: {
			'Access-Control-Allow-Origin': '*'
		},
		qs: {
			client_id: APP_ID,
			response_type: 'code',
			scope: 'rakuten_favoritebookmark_read',
			redirect_uri: encodedRedirectUri
		}
	};

	// res.redirect('https://app.rakuten.co.jp/services/authorize?client_id=1051466363713368918&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=http://localhost:8080/')

	await request(options, (error, response, body) => {
		// console.log(response);
	  if (error) {
		console.error("error", error);
	  } else {
		// res.send(body);
		res.send('<a>arimura Link</a>');
	  }
	});
});

module.exports = router;
