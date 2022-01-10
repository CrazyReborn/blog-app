const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    published: {type: Boolean}
});

PostSchema.virtual('url').get(() => {
    return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);