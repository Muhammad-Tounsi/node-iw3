const db = require('./lib/db');
const User = require('./models/user');
const Movie = require('./models/movie');

db.once('open', () => {
	let user = new User({
		firstname: "Fred",
		lastname: "Perry",
		email: "fred@oerry.com",
		birthday: new Date(),
		password: "test",
		rgpdValidator: true
	});

	user.register().then(data => console.log(data));

	User.login(user.email, "....")
		.then(user => console.log(user))
		.catch(error => console.log(error))

	User.login(user.email, user.password)
		.then(user => console.log(user))
		.catch(error => console.log(error))

	User.login("fred@oerry.com", user.password)
		.then(user => console.log(user))
		.catch(error => console.log(error))

	User.find().then(data => console.log(data));

	//Movie.find().then(data => console.log(data));

});

db.on('error', (error) => console.log(error, 'Error'));