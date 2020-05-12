var express = require('express');
var router = express.Router();
var db=require('../modules/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  let username=req.session.userInfo.username;
  db.find('test',{},data=>{
    res.render('admin/admin', {
        username:username,
        adminArr:data
    });
  }) 
});

router.get('/updateAdmin', function(req, res, next) {
  let username=req.session.userInfo.username;
  db.find('test',{},data=>{
    res.render('admin/updateAdmin', {
        username:username,
        adminArr:data
    });
  }) 
});

module.exports = router;