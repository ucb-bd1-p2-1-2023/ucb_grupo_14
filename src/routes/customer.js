const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/add', customerController.save);
router.post('/job',customerController.job);
router.post('/startUser',customerController.startUser);
router.post('/startWorker',customerController.startWorker);
module.exports = router;