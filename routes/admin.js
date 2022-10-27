var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('admin/view-products', { admin : true,products});
  })
  
});

router.get('/add-product',function(req,res){
res.render('admin/add-products')
})

router.post('/add-product',function(req,res){

// console.log(req.body);
// console.log(req.files);
productHelper.addProduct(req.body,(insertedId)=>{

  let image = req.files.Image
  const imageName = insertedId
  // console.log(id)
  image.mv('./public/product-images/'+imageName+'.jpg',(err,done)=>{
if(!err){
 
  res.render('admin/add-products')
}else{
  console.log(err)
  console.log('error occured');
}
  })
  
});
})

module.exports = router;
