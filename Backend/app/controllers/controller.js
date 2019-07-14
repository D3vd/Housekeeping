const uuid = require('uuid');

var Asset = require('../models/asset');
var Task = require('../models/task');
var Worker = require('../models/worker');
var ActiveTask = require('../models/activeTask');
var User = require('../models/user');

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
  let assetName = '';

  var asset = Asset.findOne(
    {
      assetId
    },
    (err, asset) => {
      assetName = asset.name;

      var taskJSON = {
        taskId: uuid.v4(),
        name: req.body.name,
        assetId: req.body.assetId,
        asset: assetName,
        frequency: req.body.frequency
      };

      var task = new Task(taskJSON);
      task.save();

      return res.status(200).send({
        task,
        responseType: 200
      });
    }
  );

  // TODO: Fix wrong asset ID

  // if (assetName === '') {
  //   return res.status(400).json({
  //     responseType: 400,
  //     msg: `Bad Request: No asset found with ID -- ${assetId}`
  //   });
  // }

  console.log(asset);
};

exports.addWorker = function(req, res, next) {
  let id = uuid.v4();

  var workerJSON = {
    workerId: id,
    name: req.body.name,
    task: []
  };

  var userJSON = {
    user: id,
    username: req.body.username,
    password: req.body.password,
    admin: false
  };

  var worker = new Worker(workerJSON);
  worker.save();

  var user = new User(userJSON);
  user.save();

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

exports.getTasks = function(req, res, next) {
  Task.find({}, function(err, tasks) {
    let tasksList = [];

    tasks.forEach(task => {
      tasksList.push(task);
    });

    return res.status(200).send({
      task: tasksList,
      responseType: 200
    });
  });
};

exports.getWorkers = function(req, res, next) {
  Worker.find({}, function(err, workers) {
    let workerList = [];

    workers.forEach(worker => {
      workerList.push(worker);
    });

    return res.status(200).send({
      worker: workerList,
      responseType: 200
    });
  });
};

exports.allocateTask = function(req, res, next) {
  // TODO: Error handling in case of invalid credentials

  var activeTaskJSON = {
    assetId: req.body.assetId,
    taskId: req.body.taskId,
    workerId: req.body.workerId,
    timeOfAllocation: req.body.timeOfAllocation,
    taskToBePerformedBy: req.body.taskToBePerformedBy
  };

  var activeTask = new ActiveTask(activeTaskJSON);
  activeTask.save();

  Worker.findOne(
    {
      workerId: req.body.workerId
    },
    (err, worker) => {
      let newWorker = worker;

      newWorker.tasks.push(activeTaskJSON);

      console.log(newWorker);
      var newWorkerObj = new Worker(newWorker);
      newWorkerObj.save();

      return res.status(200).send({
        activeTask,
        responseType: 200
      });
    }
  );
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

exports.login = function(req, res, next) {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (user.password === req.body.password) {
        return res.status(200).send({
          login: true,
          admin: user.admin
        });
      } else {
        return res.status(200).send({
          login: false,
          admin: user.admin
        });
      }
    }
  );
};
