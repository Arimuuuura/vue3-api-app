const express = require("express");
const router = express.Router();
const request = require("request");
require('dotenv').config()

const APP_ID = process.env.APP_ID;
const PRODUCTS_SEARCH_URL = process.env.PRODUCTS_SEARCH_URL;

router.get('/api/product-search', async (req, res) => {
	const keyword = req?.query?.keyword

	const options = {
		url: PRODUCTS_SEARCH_URL,
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
		options.qs.keyword = keyword
	}

	const formatValue = (Items) => {
		return Items.map((Item, index) => {
			const item = Item.Item
			const result = {
				id: index,
				itemName: item.itemName,
				itemCode: item.itemCode,
				itemPrice: item.itemPrice,
				itemUrl: item.itemUrl,
				reviewCount: item.reviewCount,
				reviewAverage: item.reviewAverage,
				catchcopy: item.catchcopy,
				shopName: item.shopName,
				shopCode: item.shopCode,
				shopUrl: item.shopUrl,
				genreId: item.genreId,
			}

			if(item.imageFlag) {
				result.mediumImageUrls = item.smallImageUrls[0].imageUrl
			}

			return result
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
