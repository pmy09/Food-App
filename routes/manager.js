const path = require('path');

const express = require('express');

const managerController = require('../controllers/manager');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/manager', isAuth, managerController.getManager);

router.get('/form', isAuth, managerController.getForm);

router.get('/form', isAuth, managerController.getEditUser);

router.get('/crew', isAuth, managerController.getCrew);

router.get('/chart', isAuth, managerController.getChart);

// router.get('/users', isAuth, managerController.getUsers);

router.get('/deluser/:userId', managerController.delUser);

// router.get('/approve', managerController.approveUser);

router.get('/edit-user/:userId', isAuth, managerController.getEditUser);

// router.post('/edit-user', isAuth, managerController.postEditUser);

// router.post('/approve', managerController.postEditUser)

router.post('/coupon', managerController.postCoupon);

router.get('/coupon', managerController.getCoupon);

router.get("/deletecoupon/:couponId", managerController.getDelCoupon);

router.post("/deletecoupon/:couponId", managerController.postDelCoupon);

router.get('/meals', isAuth, managerController.getMeals)

// router.get('/val', isAuth, managerController.getValidate)

module.exports = router;