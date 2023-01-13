const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')


/* GET home page. */
router.get('/', function (req, res) {
  let user = req.session.user;
  console.log(req.session.user);
  
  productHelper.getAllProducts().then((products) => {
    res.render('user/view-products', { admin: false, products ,user});
  })
  // console .log("3")
  // console.log(sess.user);
});

router.get('/login', function (req, res) {
  let user = req.session.user
  console.log(user)
  console.log(req.session.loggedIn);
  res.render('user/login')
})


router.post('/login', function (req, res) {

  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {        
      req.session.user = response.user
      req.session.save();
      res.redirect('/')

    } else {
      res.redirect('/login')
    }
  })
})

router.get('/signup', function (req, res) {
  res.render('user/signup')
})

router.post('/signup', function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    res.redirect('/login')
   
  })
})


router.get('/logout', function (req, res) {
  req.session.destroy();
  // res.render('/')
  res.redirect('/')
})

module.exports = router;
