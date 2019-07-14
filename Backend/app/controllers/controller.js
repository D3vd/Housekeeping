const uuid = require('uuid');

var Asset = require('../models/asset');
var Task = require('../models/task');
var Worker = require('../models/worker');
var ActiveTask = require('../models/activeTask');

exports.addAsset = function(req, res, next) {
  var assetJSON = {
    assetId: uuid.v4(),
    name: req.body.name
  };

  var asset = new Asset(assetJSON);
  asset.save();

  return res.status(200).send({
    asset,
    responseType: 200
  });
};

exports.addTask = function(req, res, next) {
  let assetId = req.body.assetId;

  var asset = Asset.findOne({
    assetId
  });

  // TODO: Fix wrong asset ID

  if (asset === null) {
    return res.status(400).json({
      responseType: 400,
      msg: `Bad Request: No asset found with ID -- ${assetId}`
    });
  }

  var taskJSON = {
    taskId: uuid.v4(),
    name: req.body.name,
    assetId: req.body.assetId,
    frequency: req.body.frequency
  };

  var task = new Task(taskJSON);
  task.save();

  return res.status(200).send({
    task,
    responseType: 200
  });
};

exports.addWorker = function(req, res, next) {
  var workerJSON = {
    workerId: uuid.v4(),
    name: req.body.name,
    task: []
  };

  var worker = new Worker(workerJSON);
  worker.save();

  return res.status(200).send({
    worker,
    responseType: 200
  });
};
