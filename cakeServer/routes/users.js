var express = require('express');
var router = express.Router();
var db = require('../modules/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.find('detail',{},(data)=>{
    res.send(data)
  });
  
});

module.exports = router;
