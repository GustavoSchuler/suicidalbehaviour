const mongoose = require('mongoose');
const group = mongoose.model('group');

exports.list_all_groups = (req, res) => {
  group.find({}, (err, groups) => {
    if (err) res.send(err);
    res.json(groups);
  });
};

exports.create_a_group = (req, res) => {
  req.body._id = new mongoose.Types.ObjectId()
  
  const newGroup = new group(req.body);
  newGroup.save((err, group) => {
    if (err) res.send(err);
    res.json(group);
  });
};

exports.read_a_group = (req, res) => {
  group.findById(req.params.groupId, (err, group) => {
    if (err) res.send(err);
    res.json(group);
  });
};

exports.update_a_group = (req, res) => {
  group.findOneAndUpdate(
    { _id: req.params.groupId },
    req.body,
    { new: true },
    (err, group) => {
      if (err) res.send(err);
      res.json(group);
    }
  );
};

exports.delete_a_group = (req, res) => {
  group.deleteOne({ _id: req.params.groupId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Group successfully deleted',
     _id: req.params.groupId
    });
  });
};