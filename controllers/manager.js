exports.getManager = (req, res, next) => {
    res.render('admin/manager', {
      path: '/manager',
      pageTitle: "Manager"
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

exports.getChart = (req, res, next) => {
  res.render('admin/chart', {
    path: '/chart',
    pageTitle: "Chart"
  })
};

// exports.getUsers = (req, res, next) => {
//   User.find({}, function(err, Users){
//     if (err)
//         return done(err);

//     if (Users) {
//       console.log("Users count : " + user.length);
//       res.render('admin/crew', {
//         users: Users
//       });
//     };
//   });
// };

exports.getUsers = (req, res, next) => {
  Users.find()
    .then(users => {
      console.log(users);
      res.render('admin/crew', {
        users: users,
        pageTitle: 'Users',
        path: '/users'
      });
    })
    .catch(err => {
      console.log(err);
    });
};