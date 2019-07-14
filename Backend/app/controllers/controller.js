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
