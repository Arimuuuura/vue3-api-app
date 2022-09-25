const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config()
const API_SERVER = process.env.API_SERVER;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
	res.send({val: 'Hello arimura!!'});
});

// get user
const getUser = require("./routes/get-user");
app.use("/", getUser);

// get all book
const getAllBooks = require("./routes/get-all-books");
app.use("/", getAllBooks);

// get products
const getProducts = require("./routes/get-products");
app.use("/", getProducts);

// get favorite bookmark
const getFavoriteBookmark = require("./routes/get-favorite-bookmark");
app.use("/", getFavoriteBookmark);

// put favorite bookmark
const postFavoriteBookmark = require("./routes/put-favorite-bookmark");
app.use("/", postFavoriteBookmark);

app.listen(PORT, () => {
	console.log(`Backend server port ${PORT}... ${API_SERVER}:${PORT}`);
});
