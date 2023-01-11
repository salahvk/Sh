const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('user/view-products', { admin : false,products});
  })
 
});

router.get('/login',function(req,res){
res.render('user/login')
})


router.post('/login',function(req,res){
  userHelpers.doLogin(req.body).then((response)=>{
    console.log(response)
  })
  })

router.get('/signup',function(req,res){
  res.render('user/signup')
  })

router.post('/signup',function(req,res){
userHelpers.doSignup(req.body).then((response)=>{
  console.log(response)
})
})

module.exports = router;
