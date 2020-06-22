const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    groupId: {
      type: String,
      required: 'groupId cannot be blank'
    },
    createdDate: {
      type: Date,
      required: 'createdDate cannot be blank'
    },
    description: {
      type: String,
    },
    printedDate: {
      type: Date,
      required: 'printedDate cannot be blank'
    },
    comments: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { collection: 'post' }
);

module.exports = mongoose.model('post', postSchema);