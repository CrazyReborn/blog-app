const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    author: {type: String, req: true},
    text: {type: String, req: true}
});

module.exports = mongoose.model('Comment', CommentSchema);