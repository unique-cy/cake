var express = require('express');
var router = express.Router();
var db=require("../modules/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.post( '/',function(req, res, next) {
  let json=req.body;
  db.find('test',json,(data)=>{
      if(data.length>0){
        // res.send('登录成功');
        req.session.userInfo=data[0];
        res.redirect("/")
      }else{
        // res.send('登录失败');
        // res.send("<script> alert('登录失败 请去注册') </script>");
        res.redirect("/register")
      }
  })
});
module.exports = router;
