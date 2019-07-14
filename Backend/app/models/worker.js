var mongoose = require('mongoose');

var activeTaskJSON = {
  assetId: String,
  taskId: String,
  workerId: String,
  timeOfAllocation: String,
  taskToBePerformedBy: String
};

var workerJSON = {
  workerId: String,
  name: String,
  tasks: [activeTaskJSON]
};

var workerSchema = new mongoose.Schema(workerJSON, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema);
