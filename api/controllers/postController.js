const mongoose = require('mongoose');
const post = mongoose.model('post');

const DIR = './uploads/';


exports.list_all_posts = (req, res) => {
  post.find({}, (err, posts) => {
    if (err) res.send(err);
    res.json(posts);
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