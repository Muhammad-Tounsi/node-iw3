const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo/${process.env.MONGODB_DBNAME}`, {useNewUrlParser: true});
mongoose.connect(`mongodb://192.168.99.100`, { 
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASS,
	dbName: process.env.MONGODB_DBNAME,
	useNewUrlParser: true 
});

const db = mongoose.connection;

// Movie Schema
const MovieSchema = mongoose.Schema({
	title: String,
	createdAt: Date,
	year: {
		type: Number,
		required: true,
		min: 1900
	},
	category: {
		type: String,
		enum: ['Horror', 'SF', 'Drama', 'Comedy']
	}
});

// User Schema
const UserSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	birthday: Date,
	password: String
});

// Start Movie
MovieSchema.methods.onScreen = function() {
	console.log(Date.now() > new Date(`${this.year}-01-01`));
}

MovieSchema.pre('save', function(next) {
	console.log('Saving ' + this.title);
	console.log(this);
	next();
});

MovieSchema.post('save', function() {
	console.log(this.title + " saved.");
	console.log(this);
});

const Movie = mongoose.model('Movie', MovieSchema);
// END Movie

// Start User
UserSchema.pre('save', function(next) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(this.password, salt);
	this.password = hash;
	console.log('Saving ' + this.firstname + ' ' + this.password);
	console.log(this);
	next();
});

const User = mongoose.model('User', UserSchema);

db.once('open', () => {
	const newMovie = new Movie({
		title: "Harry",
		createdAt: new Date('2018-01-01'),
		year: 2019,
		category: 'SF'
	});

	newMovie.save();

	//newMovie.save().then(data => console.log(data.onScreen())).catch(error => console.log(error));

	/*const newMovie2 = new Movie({
		name: "Toys Story 4",
		createdAt: new Date('2018-01-01'),
		year: 2019,
		category: 'Animation'
	});

	newMovie2.save().then(data => console.log(data)).catch(error => console.log(error));*/
	Movie.find().then(data => console.log(data));


});

db.on('error', (error) => console.log(error, 'Error'));