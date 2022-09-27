const express = require("express");
const router = express.Router();
const request = require("request");
const getAccessToken = require("../Auth");
require('dotenv').config()

const FAVORITE_BOOKMARK_URL = process.env.FAVORITE_BOOKMARK_URL;

router.get('/api/favorite-bookmark', async (req, res) => {
	const code = req.query.code
	const {access_token} = await getAccessToken(code)

	const options = {
		url: FAVORITE_BOOKMARK_URL,
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'User-Agent': 'request'
		},
		json: true,
		qs: {
			format: 'json',
			access_token: access_token,
			page: 1,
			hits: 9
		}
	};

	await request(options, (error, response, body) => {
	  if (error) {
		console.error("error", error);
	  } else {
		const myBookmarkList = body.items.map((Item, index) => {
			const item = Item.item
			return {
				id: index,
				bookmarkId: item.bookmarkId,
				shopName: item.shopName,
				shopUrl: item.shopUrl,
				itemName: item.itemName,
				itemUrl: item.itemUrl,
				pointRate: item.pointRate,
				imageUrl: item.mediumImageUrl,
				reviewCount: item.reviewCount,
				reviewUrl: item.reviewUrl,
				reviewAverage: item.reviewAverage,
			}
		})
		res.send({summary: body.summary, myBookmarkList});
	  }
	});
});

module.exports = router;
