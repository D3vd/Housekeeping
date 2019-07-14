const controller = require('../controllers/controller');

module.exports = app => {
  app.post('/add-asset', controller);
  app.post('/add-task', controller);
  app.post('/add-worker', controller);
  app.get('/assets-all', controller);
  app.post('/allocate-task', controller);
  app.get('/get-tasks-for-worker', controller);
};
