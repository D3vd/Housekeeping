const uuid = require('uuid');
const moment = require('moment');

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
    username: req.body.username,
    task: []
  };

  var worker = new Worker(workerJSON);
  worker.save();

  return res.status(200).send({
    worker,
    responseType: 200
  });
};

exports.getAssets = function(req, res, next) {
  Asset.find({}, function(err, assets) {
    let assetsList = [];

    assets.forEach(asset => {
      console.log(asset);
      assetsList.push(asset);
    });

    return res.status(200).send({
      assets: assetsList,
      responseType: 200
    });
  });
};

exports.allocateTask = function(req, res, next) {
  // TODO: Error handling in case of invalid credentials

  var activeTask = {
    assetId: req.body.assetId,
    taskId: req.body.taskId,
    workerId: req.body.workerId,
    timeOfAllocation: req.body.timeOfAllocation,
    taskToBePerformedBy: req.body.taskToBePerformedBy
  };

  var activeTask = new ActiveTask(activeTaskJSON);
  activeTask.save();

  return res.status(200).send({
    activeTask,
    responseType: 200
  });
};

exports.getTasksForWorker = function(req, res, next) {
  Worker.findOne(
    {
      workerId: req.params.id
    },
    (err, worker) => {
      return res.status(200).send({
        worker,
        responseType: 200
      });
    }
  );
};
