const controller = require('../controllers/controller');

module.exports = app => {
  app.post('/add-asset', controller.addAsset);
  app.post('/add-task', controller.addTask);
  app.post('/add-worker', controller.addWorker);
  app.get('/assets-all', controller.getAssets);
  app.get('/tasks-all', controller.getTasks);
  app.get('/workers-all', controller.getWorkers);
  app.post('/allocate-task', controller.allocateTask);
  app.get('/get-tasks-for-worker/:id', controller.getTasksForWorker);
  app.post('/login', controller.login);
};
