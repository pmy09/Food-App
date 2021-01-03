const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
// const { db } = require('../models/user');

exports.getManager = (req, res, next) => {
  User.find({})
  .then(user => {
    console.log(user);
    res.locals.user = user;
    res.render('admin/manager', {
      user : user,
      path: '/manager',
      pageTitle: "Manager"
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
    res.render('admin/chart', {
      path: '/chart',
    pageTitle: "Chart",
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

    res.render('admin/manager', {
      user : user,
      path: '/manager',
      pageTitle: "Manager"
    })

  })
  
};

exports.getEditUser = (req, res, next) => {
  const uId = req.params.userId;
  // User.findById(uId).update(disabled)
  User.findByIdAndUpdate(uId, {disabled: false})
    .then(user => {
      
      res.render('admin/manager', {
        user: user,
        // disabled : false,
        path: '/manager',
      pageTitle: "Manager"
        
        
      });
    })
    .catch(err => console.log(err));
};

