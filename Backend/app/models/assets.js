var mongoose = require('mongoose');

var assetJSON = {
  assetId: String,
  name: String
};

var assetSchema = new mongoose.Schema(assetJSON, {
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema);
