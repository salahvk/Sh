const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')
const verifyLogin = (req, res,next) => {
  if(req.session.loggedIn){
next()
  }else{
    res.redirect('/login')
  }
}


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
  if(req.session.loggedIn){
res.redirect('/')
  }
else{

  res.render('user/login',{"loginErr" :req.session.loginErr})
  req.session.loginErr =false;
}
  
  
})


router.post('/login', function (req, res) {

  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {        
      req.session.user = response.user
      req.session.loggedIn = true;
      req.session.save();
      res.redirect('/')

    } else {
      req.session.loginErr = true;
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
    req.session.user = response
    req.session.loggedIn = true;
    req.session.save();
    res.redirect('/')
   
  })
})


router.get('/logout', function (req, res) {
  req.session.destroy();
  // res.render('/')
  res.redirect('/')
})

 
router.get('/cart', function (req, res) {
  res.render('user/cart');
})

router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  let userId = req.session.user._id;
userHelpers.addToCart(req.params.id,userId).then(()=>{
  res.redirect('/')
})
})

module.exports = router;
