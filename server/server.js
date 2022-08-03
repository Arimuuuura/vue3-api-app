const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config()
const API_SERVER = process.env.API_SERVER;
const PORT = process.env.PORT;

app.use(cors())

app.get("/", (req, res) => {
	res.send("Hello from backend");
});

app.listen(PORT, () => {
	console.log(`Backend server port ${PORT}... ${API_SERVER}:${PORT}`);
});
