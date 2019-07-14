var mongoose = require('mongoose');

var userJSON = {
  userID: String,
  username: String,
  password: String,
  class: String
};

var userSchema = new mongoose.Schema(userJSON, {
  timestamps: true
});

module.exports = mongoose.model('Asset', userSchema);
