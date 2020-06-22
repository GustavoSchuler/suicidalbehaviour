const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: 'name cannot be blank'
    },
    url: {
      type: String,
      required: 'url cannot be blank'
    },
    createdDate: {
      type: Date,
      required: 'createdDate cannot be blank'
    },
    privacy: {
      type: String,
      required: 'privacy cannot be blank'
    },
    visibility: {
      type: String,
      required: 'visibility cannot be blank'
    },
    joinDate: {
      type: Date,
    },
    members: {
      type: Number,
      required: 'members cannot be blank'
    }
  },
  { collection: 'group' }
);

module.exports = mongoose.model('group', groupSchema);