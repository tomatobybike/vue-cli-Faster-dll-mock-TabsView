var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/login', function(req, res, next) {
    var data={
        "data":{"token":"admin"},
        "code":0,
        "msg":"error"
    }
    //data={"result":false,"error":"imei\/m1\/emmc\/cpu\/product \u5fc5\u586b\u9009\u4e00\u4e2a"}
    $util.delayed(function(){
        res.json(data);
    },500);
});

router.all('/info', function(req, res, next) {
  var data={"code":0,"data":{"roles":["admin"],"name":"yangqiong","avatar":"../assets/img/user.png"}}
  //data={"result":false,"error":"imei\/m1\/emmc\/cpu\/product \u5fc5\u586b\u9009\u4e00\u4e2a"}
  $util.delayed(function(){
    res.json(data);
  },500);
});

router.all('/logout', function(req, res, next) {
  var data={
    "data":{"token":"admin"},
    "code":0,
    "msg":"OK"
  }
  //data={"result":false,"error":"imei\/m1\/emmc\/cpu\/product \u5fc5\u586b\u9009\u4e00\u4e2a"}
  $util.delayed(function(){
    res.json(data);
  },500);
});

module.exports = router;
