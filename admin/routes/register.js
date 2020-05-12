var express = require('express');
var router = express.Router();
var db=require("../modules/db")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});


router.post( '/',function(req, res, next) {
    db.find('test',{},(data)=>{
        let kkk=data.find((item)=>{
            console.log(req.body.username)
            console.log(item.username)
          return (item.username==req.body.username);
        })
        if(kkk){
            res.redirect('/register');
        }else{
            db.insert('test',{
                username:req.body.username,
                password:req.body.password
            },(data)=>{
                console.log(data);
            })
            res.redirect('/login');
        }
      })
});
module.exports = router;
