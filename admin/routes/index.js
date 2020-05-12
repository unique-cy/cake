var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let username=req.session.userInfo.username;
  res.render('admin/index', {username:username});
});

module.exports = router;
