const mongoose = require('mongoose');
const { Schema } = mongoose;

const clickedUsers = new Schema({
  clickedID: String,
  clickedTime: String
});

module.exports = mongoose.model('clickedUsers', clickedUsers); 