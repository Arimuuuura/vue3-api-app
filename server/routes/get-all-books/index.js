const express = require("express");
const router = express.Router();
const request = require("request");

require('dotenv').config()

const APP_ID = process.env.APP_ID;
const BOOK_SEARCH_URL = process.env.BOOK_SEARCH_URL;

router.get('/api/book-search', async (req, res) => {
	const keyword = req?.query?.keyword

	const options = {
		url: BOOK_SEARCH_URL,
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'User-Agent': 'request'
		},
		json: true,
		qs: {
			format: 'json',
			applicationId: APP_ID,
			page: 1,
			hits: 9
		}
	};

	if(keyword) {
		options.qs.title = keyword
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
				isbn: item.isbn,
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
