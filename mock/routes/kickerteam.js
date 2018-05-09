var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/list', function(req, res, next) {
  var data={
    "code":0,
    "msg":null,
    "data":{
      "total":200,
      "list":[
        {
          "id":5,
          "name":"巴萨罗那",
          "createdate":1524453842933
        },
        {
          "id":6,
          "name":"罗马",
          "createdate":1524468649929
        }
      ]
    }
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },500);
});

router.all('/create', function(req, res, next) {
  var data={
    "code":0,
    "data":[],
    "msg":'ok'
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },1);
});

router.all('/update', function(req, res, next) {
  var data={
    "code":0,
    "data":[],
    "msg":'ok'
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },500);
});

router.all('/delete', function(req, res, next) {
  var data={
    "code":0,
    "data":[],
    "msg":'ok'
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },500);
});

module.exports = router;