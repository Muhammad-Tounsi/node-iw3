const mongoose = require('mongoose');

mongoose.connect(`mongodb://192.168.99.100`, { 
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASS,
	dbName: process.env.MONGODB_DBNAME,
	useNewUrlParser: true 
});

module.exports = mongoose.connection;