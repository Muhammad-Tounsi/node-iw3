const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.*/, 'Invalid email']
    },
    birthday: Date,
    password: {
        type: String,
        required: true
    },
    rgpdValidator: {
        type: Boolean,
        required: true
    }   
});

//methods car besoin de l'instance
UserSchema.methods.register = function() {
    return this.save();
}

//statics car on utilise le modèle
UserSchema.statics.login = function(email, password) {
    return new Promise((resolve, reject) => {
        User.findOne({email})
        .then(user => {
            if(!user) return reject('User not found');
            bcrypt.compare(password, user.password)
            .then(res => res ? resolve(user): reject('Wrong password'));
        })
        .catch(error => reject(error));
    })
}

UserSchema.pre('save', function(next){
    console.log('saving ' + this.firstname);
    const that = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(that.password, salt, function(err, hash) {
            console.log(hash);
            that.password = hash;
            next();
        });
    });
    console.log(this);
});

const User = mongoose.model('User', UserSchema);
module.exports = User;