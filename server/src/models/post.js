const mongoose = require('mongoose');

const { Schema } = mongoose;

// const PostCategory = new Schema({
//     category:String,
//     posts:[PostSchema],
//     extra:Schema.Types.Mixed,
// })

const PostSchema = new Schema({
  title: String,
  body: String,
  thumbnail: String,
  images: [String],
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
    nickname: String,
    adminCode: String,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
