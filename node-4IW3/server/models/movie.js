const mongoose = require('mongoose');

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
module.exports = Movie;