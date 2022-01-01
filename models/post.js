const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    date: {type: Date}
});

PostSchema.virtual('url').get(() => {
    return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);