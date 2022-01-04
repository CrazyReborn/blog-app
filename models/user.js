const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String
});

UserSchema.virtual('full_name').get(() => {
    first_name + ' ' + last_name;
})

module.exports = mongoose.model('User', UserSchema);