const mongoose = require('mongoose');
const post = mongoose.model('post');

const DIR = './uploads/';


exports.list_all_posts = (req, res) => {
  const { page } = req.query
  const limit = 10

  post.find({},{}, { skip: (page-1) * limit, limit: limit }, (err, posts) => {
    if (err) res.send(err);
    post.countDocuments({}).exec((count_error, count) => {
      if (err) {
        return res.json(count_error);
      }
      return res.json({
        total: count,
        page: page,
        pageSize: posts.length,
        content: posts
      });
    });
  });
};

exports.read_a_post = (req, res) => {
  post.findById(req.params.postId, (err, post) => {
    if (err) res.send(err);
    res.json(post);
  });
};

exports.delete_a_post = (req, res) => {
  post.deleteOne({ _id: req.params.postId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Post successfully deleted',
     _id: req.params.postId
    });
  });
};