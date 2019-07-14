var mongoose = require('mongoose');

var taskJSON = {
  taskId: String,
  name: String,
  assetId: String,
  asset: String,
  frequency: String
};

var activeTaskJSON = {
  assetId: String,
  taskId: String,
  task: taskJSON,
  workerId: String,
  timeOfAllocation: String,
  taskToBePerformedBy: String
};

var activeTaskSchema = new mongoose.Schema(activeTaskJSON, {
  timestamps: true
});

module.exports = mongoose.model('ActiveTask', activeTaskSchema);
