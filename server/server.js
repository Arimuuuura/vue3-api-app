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

// auth
const auth = require("./routes/Auth");
app.use("/", auth);
// access token
const accessToken = require("./routes/get-access-token");
app.use("/", accessToken);

// get user
const getUser = require("./routes/get-user");
app.use("/", getUser);

// get all book
const getAllBooks = require("./routes/get-all-books");
app.use("/", getAllBooks);

app.listen(PORT, () => {
	console.log(`Backend server port ${PORT}... ${API_SERVER}:${PORT}`);
});
