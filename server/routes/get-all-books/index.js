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
		return Items.map((Item, index) => {
			const item = Item.Item
			return {
				id: index,
				title: item.title,
				author: item.author,
				largeImageUrl: item.largeImageUrl,
				publisherName: item.publisherName,
				salesDate: item.salesDate,
				itemUrl: item.itemUrl,
				itemPrice: item.itemPrice,
				itemCaption: item.itemCaption,
				reviewAverage: item.reviewAverage,
				reviewCount: item.reviewCount,
			}
		})
	}

	await request(options, (error, response, body) => {
	  if (error) {
		console.error("error", error);
	  } else {
		const result = formatValue(body.Items)
		res.send({result: result});
	  }
	});
});

module.exports = router;
