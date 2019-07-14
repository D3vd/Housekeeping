var mongoose = require('mongoose');

var userJSON = {
  userID: String,
  username: String,
  password: String,
  admin: Boolean
};

var userSchema = new mongoose.Schema(userJSON, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
