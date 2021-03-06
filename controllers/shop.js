const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon')
const bcrypt = require('bcryptjs');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Eats',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/products');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          username: req.user.username,
          userId: req.user
        },
        products: products,
        date: new Date(),
        delivered: false
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
      });
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
      // res.locals.user = user
    //   res.render('shop/checkout', {
    //     path: '/checkout',
    //     pageTitle: 'Checkout',
    //     // user : user,
    //     orders: orders
    //   })
    // })
    .catch(err => console.log(err));
    })
};


exports.delUser =  (req, res) => {

  const uId = req.params.userId
  
  User.findById(uId).deleteOne()
  .then(user => {

    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    })

  })
  
};

exports.getCompleteOrders = (req, res) => {
  const oId = req.params.orderId
  console.log(oId);
  Order.findByIdAndUpdate(oId, {delivered: true})
  .then(orders => {
    res.redirect('/orders')
  })
  
  // Order.findByIdAndUpdate(oId, {disabled: false})
  .catch(err => console.log(err));
}


exports.getDelOrders = (req, res) => {
  const oId = req.params.orderId
  Order.findById(oId).deleteOne()
  .then(orders => {
    res.redirect('/orders')

  })
}

exports.getToday = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/today', {
        prods: products,
        pageTitle: 'Today',
        path: '/today'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: "Checkout",

  })
}

exports.getValidate = (req, res, next) => {
  const coupon = req.body.coupon;
  console.log(coupon)
  Coupon.findOne({ code: coupon})
  .then(coupon => {
    if (coupon === undefined) {
      req.flash('error', 'Invalid coupon.');
      return res.redirect('/checkout');
  }
  // bcrypt
  //       .compare(coupon, coupon.code)
  //       .then(doMatch => {
  //         if (doMatch) {
  //           req.flash('error', 'Coupon Validated.');
  //     return res.redirect('/');
  //           };
  //           req.flash('error', 'Invalid coupon.');
  //           return res.redirect('/checkout');
  //         })
  //       .catch(err => {
  //         console.log(err);
  //         res.redirect('/checkout');
  //       });
    })
    .catch(err => console.log(err));
};

// exports.getValidate = (req, res, next) => {
//   req.flash('error', 'Coupon Validated.');
// };