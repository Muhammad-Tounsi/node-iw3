const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(`mongodb://192.168.99.100`, {
	user: process.env.MONGODB_USER,
	pass: process.env.MONGODB_PASS,
	dbName: process.env.MONGODB_DBNAME, 
	useNewUrlParser: true
});

const db = mongoose.connection;

const UserSchema = mongoose.Schema({
	Firstname: String,
	Lastname: String,
	Birthday: Date,
	Password: String,
	IsRGPD: Boolean,
	
});


UserSchema.pre('save', function(next){
	console.log('saving ' + this.Firstname);
	const that = this;
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(that.Password, salt, function(err, hash) {
	    	console.log(hash);
	        that.Password = hash;
	        next();
	    });
	});
	console.log(this);
});


UserSchema.post('save', function(){
	console.log(this.Firstname + " saved.");
	console.log(this);
})


const User = mongoose.model('User',UserSchema);


db.once('open',() => {
	const user1 = new User({
		Firstname: "mh",
		Lastname: "wali",
		Birthday: new Date('1996-01-01'),
		Password: "motdepasse",
		IsRGPD: true
	});

	user1.save();

});


db.on('error', (error) => console.log(error,'Error'));