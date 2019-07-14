var mongoose = require('mongoose');

var activeTaskJSON = {
  assetId: String,
  taskId: String,
  workerId: String,
  timeOfAllocation: String,
  taskToBePerformedBy: String
};

var activeTaskSchema = new mongoose.Schema(activeTaskJSON, {
  timestamps: true
});

module.exports = mongoose.model('ActiveTask', activeTaskSchema);
