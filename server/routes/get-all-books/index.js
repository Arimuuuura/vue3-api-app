const express = require("express");
const router = express.Router();
const request = require("request");

require('dotenv').config()

const APP_ID = 'applicationId=1051466363713368918'
const URL = 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404'
const SEARCH_URL = `${URL}?format=json&${APP_ID}`

router.get('/api/search', async (req, res) => {
	const keyword = req.query.keyword

	const options = {
		url: SEARCH_URL,
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'User-Agent': 'request'
		},
		json: true,
		qs: {
			page: 1,
			hits: 3
		}
	};

	if(keyword) {
		options.qs = {
			page: 1,
			title: keyword,
			hits: 3
		}
	}

	const formatValue = (Items) => {
		return Items.map((item) => {
			return {
				title: item.Item.title,
				author: item.Item.author,
				largeImageUrl: item.Item.largeImageUrl,
				publisherName: item.Item.publisherName,
				salesDate: item.Item.salesDate,
				itemUrl: item.Item.itemUrl,
				itemPrice: item.Item.itemPrice,
			}
		})
	}

	await request(options, (error, response, body) => {
	  if (error) {
		console.error("error", error);
	  } else {
		res.send({result: formatValue(body.Items)});
	  }
	});
});

module.exports = router;
