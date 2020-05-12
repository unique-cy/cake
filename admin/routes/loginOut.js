var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/login');
    }
  })
});

module.exports = router;
