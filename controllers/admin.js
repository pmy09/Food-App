const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon')

exports.getAddProduct = (req, res, next) => {
  Product.find()
    .then(products => {
      
  res.render('admin/add-product', {
    prods: products,
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
})};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const day = req.body.day;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    day: day,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedDay = req.body.day;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      product.day = updatedDay;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


// exports.getManager = (req, res, next) => {
//   res.render('admin/manager ', {
//     path: '/manager',
//     pageTitle: "Manager"
//   })
// };

exports.getManager = (req, res, next) => {
  User.find({})
  .then(user => {
    res.locals.user = user;
    Order.find({})
    .then(order => {
      res.locals.order = order;
      Product.find({})
      .then(product => {
        res.locals.product = product;
        Coupon.find({})
        .then(coupon => {
          res.locals.coupon = coupon;
          res.render('admin/manager', {
            user : user,
            order : order,
            path: '/manager',
            pageTitle: "Manager"
          })
        })
        })
      })
      .catch(err => {
        console.log(err);
      });
    
 })
};

exports.getUsers = (req, res, next) => {
  User.find({})
  .then(user => {
    console.log(user);
    res.locals.user = user;
    res.render('admin/crew', {
      user: user,
      pageTitle: 'Users',
      path: '/users'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCoupon = (req, res) => {
  Coupon.find()
  .then(coupon => {
    res.locals.coupon = coupon;
    res.render('admin/coupon', {
      coupon: coupon,
      pageTitle: 'Coupons',
      path: 'admin/coupon'
    })
  })
  .catch(err => console.log(err))
}

exports.postCoupon = (req, res) => {
  const code = req.body.code;
  const coupon = new Coupon({
    code: code,
    date: new Date(),
  });
  return coupon.save()
  .then(result => {
    res.redirect('admin/manager')
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getDelCoupon = (req, res) => {
  const cId = req.params.couponId;
  console.log(cId)
  Coupon.findById(cId).deleteOne()
  .then(coupon => {
    res.render("admin/coupon", {
      coupon : coupon
    })
  })
};
 
exports.postDelCoupon = (req, res) => {
  const cId = req.params.couponId;
  console.log(cId)
  Coupon.findById(cId).deleteOne()
  .then(coupon => {
    res.render("admin/coupon", {
      coupon : coupon
    })
  })
};



// exports.getValidate = (req, res, next) => {
//   const coupon = req.body.coupon;
//   console.log('HI')
//   Coupon.findOne({ code: coupon})
//   .then(coupon => {
//     if (!coupon) {
//       req.flash('error', 'Invalid coupon.');
//       return res.redirect('/checkout');
//   }
//   bcrypt
//         .compare(coupon, coupon.code)
//         .then(doMatch => {
//           if (doMatch) {
//             req.flash('error', 'Coupon Validated.');
//       return res.redirect('/');
//             };
//             req.flash('error', 'Invalid coupon.');
//             return res.redirect('/checkout');
//           })
//         .catch(err => {
//           console.log(err);
//           res.redirect('/checkout');
//         });
//     })
//     .catch(err => console.log(err));
// };