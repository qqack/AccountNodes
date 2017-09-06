const router = require('koa-router')()
const dayConsController = require('./../controllers/dayConsCtrl')

const routers = router
  .post('/api/cons/daycons', dayConsController.addDayCons)

module.exports = routers