const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res) {
  // let user = req.session.user
  console.log(req.session.user)
  productHelper.getAllProducts().then((products)=>{
    res.render('user/view-products', { admin : false,products});
  })
 
});

router.get('/login',function(req,res){
  let user = req.session.user
  console.log(user)
  console.log(req.session.loggedIn);
res.render('user/login')
})


router.post('/login',function(req,res){

  userHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
    res.redirect('/')
    console.log(1)
    req.session.loggedIn = true;
    console.log(req.session.loggedIn)
    req.session.user = response.user
    console.log(req.session.user)

  }else{
    res.redirect('/login')
  }
  })
  })

router.get('/signup',function(req,res){
  res.render('user/signup')
  })

router.post('/signup',function(req,res){
userHelpers.doSignup(req.body).then((response)=>{
 
})
})

module.exports = router;
