var express = require('express');
var router = express.Router();
var multiparty=require('multiparty')
var fs=require('fs')
var db=require('../modules/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  let username=req.session.userInfo.username;
  db.find('classify',{},data=>{
      let birthdayArr=[]
      for (let i = 0; i < data.length; i++) {
          if(data[i].dataItem=='Birthday'){
            birthdayArr.push(data[i]) 
          }     
      }
        res.render('indexData/birthday', {                                                       
            username:username,
            birthdayArr:birthdayArr
        });
  }) 
});

module.exports = router;