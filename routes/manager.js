const path = require('path');

const express = require('express');

const managerController = require('../controllers/manager');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/manager', isAuth, managerController.getManager);

router.get('/form', isAuth, managerController.getForm);

router.get('/crew', isAuth, managerController.getCrew);

router.get('/chart', isAuth, managerController.getChart);

router.get('/users', isAuth, managerController.getUsers);

module.exports = router;