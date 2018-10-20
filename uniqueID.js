const mongoose = require('mongoose');
const { Schema } = mongoose;

const clickedUsers = new Schema({
  clickedID: String
});

module.exports = mongoose.model('clickedUsers', clickedUsers); 