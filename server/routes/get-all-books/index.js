const express = require("express");
const router = express.Router();

require('dotenv').config()

router.get("/api/search", (req, res) => {
	res.send({
		result: `${req.query.keyword} search result`
	});
});

module.exports = router;
