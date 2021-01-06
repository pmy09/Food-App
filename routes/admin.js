const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);


router.get('/manager', isAuth, adminController.getManager);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get('/users', adminController.getUsers);

router.post('/coupon', adminController.postCoupon);

router.get('/coupon', adminController.getCoupon);

router.get("/deletecoupon/:couponId", adminController.getDelCoupon);

router.post("/deletecoupon/:couponId", adminController.postDelCoupon);

// router.get('/val', isAuth, adminController.getValidate)

module.exports = router;
