var mongoose = require('mongoose');

var taskJSON = {
  taskId: String,
  name: String,
  assetId: String,
  asset: String,
  frequency: String
};

var taskSchema = new mongoose.Schema(taskJSON, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
