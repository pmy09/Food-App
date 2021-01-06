const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon')
// const { db } = require('../models/user');

// exports.getManager = (req, res, next) => {
//   User.find({})
//   .then(user => {
//     console.log(user);
//     res.locals.user = user;
//     res.render('admin/manager', {
//       user : user,
//       path: '/manager',
//       pageTitle: "Manager"
//     })
//  })
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
      
    
 })
};

exports.getForm = (req, res, next) => {
  res.render('admin/form', {
    path: '/form',
    pageTitle: "Form"
  })
};

exports.getCrew = (req, res, next) => {
  res.render('admin/crew', {
    path: '/crew',
    pageTitle: "Crew"
  })
};


exports.getCrew = (req, res, next) => {
  User.find({})
  .then(user => {
    let adminCounter = 0;
      let staffCounter = 0;
      let traineeCounter = 0;
      let managerCounter = 0;

      for (let person of user) {
        if (person.role === "admin") {
          adminCounter++;
        } else if (person.role === "manager") {
          managerCounter++;
        } else if (person.role === "staff") {
          staffCounter++;
        } else {
          traineeCounter++;
        }
      }
    // console.log(user);
    res.locals.user = user;
    res.render('admin/crew', {
      user: user,
      adminCounter : adminCounter,
        traineeCounter :traineeCounter,
        managerCounter : managerCounter,
        staffCounter: staffCounter,
      pageTitle: 'Crew',
      path: '/crew'
    });
  })
  .catch(err => {
    console.log(err);
  });
};


// exports.getChart = (req, res, next) => {
//   res.render('admin/chart', {
//     path: '/chart',
//     pageTitle: "Chart"
//   })
// };

exports.getChart = (req, res, next) => {
  Order.find({})
  .then(orders => {
    res.render('admin/orders', {
      path: '/chart',
    pageTitle: "Orders",
    orders: orders
    })
  })
  .catch(err => console.log(err));
};

  

// exports.getUsers = (req, res, next) => {
//   User.find()
//     .then(user => {
//       console.log(user);
//       res.locals.user = user;
//       res.render('admin/crew', {
//         user: user,
//         pageTitle: 'Users',
//         path: '/users'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.delUser =  (req, res) => {

  const uId = req.params.userId
  
  User.findById(uId).deleteOne()
  .then(user => {

    res.redirect('/crew')
    //   user : user,
    //   path: '/manager',
    //   pageTitle: "Manager"
    // })

  })
  
};

exports.getEditUser = (req, res, next) => {
  const uId = req.params.userId;
  // User.findById(uId).update(disabled)
  User.findByIdAndUpdate(uId, {disabled: false})
    .then(user => {
      
      res.redirect('/crew')
      //   user: user,
      //   // disabled : false,
      //   path: '/manager',
      // pageTitle: "Manager"
        
        
      // });
    })
    .catch(err => console.log(err));
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
    res.redirect('admin/coupon')
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
    res.locals.coupon = coupon;
    res.redirect("/coupon")
    //   coupon : coupon,
    //   pageTitle: 'Coupons',
    //   // path: 'admin/coupon'
    // })
  })
};
 
exports.postDelCoupon = (req, res) => {
  const cId = req.params.couponId;
  console.log(cId)
  Coupon.findById(cId).deleteOne()
  .then(coupon => {
    res.locals.coupon = coupon;
    res.render("admin/coupon", {
      coupon : coupon,
      pageTitle: 'Coupons',
      // path: 'admin/coupon'
    })
  })
};

exports.getMeals = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/meals', {
        prods: products,
        pageTitle: 'Meals',
        // path: '/admin/meals'
      });
    })
    .catch(err => console.log(err));
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