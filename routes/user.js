const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}


/* GET home page. */
router.get('/', async function (req, res) {
  let user = req.session.user;
  let cartCount = null;
  if (req.session.user) {
    cartCount = await userHelpers.getCartCount(user._id)
  }

  productHelper.getAllProducts().then((products) => {
    console.log(products)
    res.render('user/view-products', { admin: false, products, user, cartCount });
  })

});

router.get('/login', function (req, res) {
  let user = req.session.user
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  else {

    res.render('user/login', { "loginErr": req.session.loginErr })
    req.session.loginErr = false;
  }


})


router.post('/login', function (req, res) {

  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user
      console.log("Logged In")
      console.log(req.session.user)
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
    // console.log(response)
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


router.get('/cart', verifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  console.log(products)
  res.render('user/cart', { products });
})

router.get('/add-to-cart/:id', verifyLogin, (req, res) => {
  console.log("Add to cart")
  let userId = req.session.user._id;
  userHelpers.addToCart(req.params.id, userId).then(() => {
    res.json({ status: true })
  })
})

router.post('/change-product-quantity', (req, res) => {
  console.log("change")
  userHelpers.changeProductQuantity(req.body).then((response) => {
    res.json(response)
  })
})

router.post('/remove-product', (req, res) => {
  console.log("Hi")
  userHelpers.removeProductFromCart(req.body).then((response) => {
    console.log("2")
    console.log(response)
    res.json(response)
  })
})

router.get('/place-order',(req,res)=>{
  res.render('user/place-order')
})
module.exports = router;
