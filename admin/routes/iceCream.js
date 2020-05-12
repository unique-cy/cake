var express = require('express');
var router = express.Router();
var multiparty=require('multiparty')
var fs=require('fs')
var db=require('../modules/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  let username=req.session.userInfo.username;
  db.find('classify',{},data=>{
      let iceCreamArr=[]
      for (let i = 0; i < data.length; i++) {
          if(data[i].dataItem=='IceCream'){
            iceCreamArr.push(data[i]) 
          }     
      }
        res.render('otherData/iceCream', {                                                       
            username:username,
            iceCreamArr:iceCreamArr
        });
  }) 
});

module.exports = router;