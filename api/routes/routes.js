const postBuilder = require('../controllers/postController');
const groupBuilder = require('../controllers/groupController');
const mongoose = require('mongoose');
const post = mongoose.model('post');
const multer = require('multer');

const DIR = './sbapp/uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


module.exports = app => {
  app
    .route('/posts')
    .get(postBuilder.list_all_posts);

  app
    .route('/posts/:postId')
    .get(postBuilder.read_a_post)
    .delete(postBuilder.delete_a_post);

  app
    .route('/groups')
    .get(groupBuilder.list_all_groups)
    .post(groupBuilder.create_a_group);

  app
    .route('/groups/:groupId')
    .get(groupBuilder.read_a_group)
    .put(groupBuilder.update_a_group)
    .delete(groupBuilder.delete_a_group);

  app.post('/posts', upload.array('files', 10), (req, res) => {
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename)
    }
    
    req.body.image = reqFiles[0]
    req.body._id = new mongoose.Types.ObjectId()

    const newPost = new post(req.body);
    
    newPost.save((err, post) => {
      if (err) res.send(err);
      res.json(post);
    });
  });

  app.put('/posts/:postId', upload.array('files', 10), (req, res) => {
    req.body._id = new mongoose.Types.ObjectId(req.params.postId)

    post.findOneAndUpdate(
      { _id: req.params.postId },
      req.body,
      { new: true },
      (err, post) => {
        if (err) res.send(err);
        res.json(post);
      }
    );
  });
};