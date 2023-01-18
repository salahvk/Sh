var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    res.render('admin/view-products', { admin: true, products });
  })

});

router.get('/add-product', function (req, res) {
  res.render('admin/add-products')
})

router.post('/add-product', function (req, res) {
  productHelper.addProduct(req.body, (insertedId) => {

    let image = req.files.Image
    const imageName = insertedId
    image.mv('./public/product-images/' + imageName + '.jpg', (err, done) => {
      if (!err) {
        res.render("admin/view-products")
        // res.render('admin/add-products')
      } else {
        // console.log(err)
        // console.log('error occured');

      }
    })

  });
})

router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  // console.log(proId);
  productHelper.deleteProduct(proId).then((response) => {
    res.redirect('/admin')
  })
})

router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelper.getProductDetails(req.params.id);
  res.render('admin/edit-product', { product })

})

router.post('/edit-product/:id', (req, res) => {
  productHelper.updateProduct(req.params.id, req.body).then((
    ) => {  
    res.redirect('/admin')
    if(req.files.Image){
      let image = req.files.Image
      const imageName = req.params.id
      image.mv('./public/product-images/' + imageName + '.jpg',)
    }
    })  

})


module.exports = router;
