var express = require('express');
var router = express.Router();
var db = require('../modules/db');

/* GET users listing. */
router.get('/', function(req, res, next) {

  db.find('banner',{},(data)=>{
    console.log(data)
  })

});
module.exports = router;
