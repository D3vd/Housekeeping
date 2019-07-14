const controller = require('../controllers/controller');

module.exports = app => {
  app.post('/add-asset', controller.addAsset);
  app.post('/add-task', controller.addTask);
  app.post('/add-worker', controller.addWorker);
  app.get('/assets-all', controller.getAssets);
  app.post('/allocate-task', controller.allocateTask);
  // app.get('/get-tasks-for-worker/:id', controller);
};