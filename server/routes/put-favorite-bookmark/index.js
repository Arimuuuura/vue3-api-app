const express = require("express");
const router = express.Router();
const request = require("request");
const getAccessToken = require("../Auth");

require('dotenv').config()

const ADD_FAVORITE_BOOKMARK_URL = process.env.ADD_FAVORITE_BOOKMARK_URL;

const actions = {
	'add': process.env.ADD_FAVORITE_BOOKMARK_URL,
	'delete': process.env.DELETE_FAVORITE_BOOKMARK_URL,
}

router.post('/api/favorite-bookmark', async (req, res) => {
	const code = req.body.code
	const id = req.body.id
	const action = req.body.action
	console.log({code,id,action});

	const {access_token} = await getAccessToken(code)
	console.log('access_token', access_token);

	const options = {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'User-Agent': 'request'
		},
		json: true,
		qs: {
			format: 'json',
			access_token: access_token,
		}
	};

	if(action === 'add') {
		options.url = process.env.ADD_FAVORITE_BOOKMARK_URL,
		options.qs.itemCode = id
	} else if(action === 'delete') {
		options.url = process.env.DELETE_FAVORITE_BOOKMARK_URL,
		options.qs.bookmarkId = id
	}

	console.log(options);

	await request(options, (error, response, body) => {
	  if (error) {
		console.error("error", error);
	  } else {
		res.send(body);
	  }
	});
});

module.exports = router;
