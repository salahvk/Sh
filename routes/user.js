var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[
   { name:"IPHONE 11", category: 'Mobile', description: "This is a good phone", image:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-purple-select-2019?wid=940&hei=1112&fmt="},
    {name:"IPhone 14", category: 'Mobile', description: "This is a good phone", image:"https://imgs.search.brave.com/-_dRwjjaYtkcuKCS9HlXSCuV4utIBuhAoZfJiqHbjsM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/SUxiUnlQMERSRlhY/anNVNXpISmpnSGFF/NyZwaWQ9QXBp"},
    {name:"OPPO 10X", category: 'Mobile', description:"This is a good phone", image:"https://imgs.search.brave.com/1X8bSlpw38GQSw_5Fejt3l7g1Z_npnhPfHVn4AYNT1E/rs:fit:444:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5N/RF9ISFlvaFlzM3Vt/QVV3bmRJcW1RSGFI/NSZwaWQ9QXBp"},
    {name:"MI Note 9 pro", category: 'Mobile', description:"This is a good phone", image:"https://imgs.search.brave.com/EdX29h6bRn_1f3u381WfE-nswIjgXyEMWdsRooP3-H4/rs:fit:509:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/aDBUamlrV1laZzkw/czBrS0h0ZXVnSGFH/NSZwaWQ9QXBp"}
  ]
    
  res.render('index', { admin : false,products});
});

module.exports = router;
