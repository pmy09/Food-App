const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// router.get('/manager', shopController.getManager);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

router.get('/today', isAuth, shopController.getToday);

router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/delorders/:orderId', isAuth, shopController.getDelOrders);

router.get('/deliver/:orderId', isAuth, shopController.getCompleteOrders);

router.get('/val', isAuth, shopController.getValidate)

module.exports = router;
