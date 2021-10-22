const express = require('express')
const cors = require('cors');
const app = express()
const dotenv = require('dotenv')
const db = require('./db/db');
const initRoute = require('./routes/init')

app.use(cors());
dotenv.config();

// Connect DB
db.connect()

app.use(express.json());

//Route Middlewares
app.use('/api/init', initRoute)

let server = app.listen(process.env.PORT)

module.exports = {
	server
};
