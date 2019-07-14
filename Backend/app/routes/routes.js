const controller = require('../controllers/controller');

module.exports = app => {
  app.post('/add-asset', controller.addAsset);
  app.post('/add-task', controller.addTask);
  app.post('/add-worker', controller.addWorker);
  // app.get('/assets-all', controller);
  // app.post('/allocate-task', controller);
  // app.get('/get-tasks-for-worker', controller);
};
