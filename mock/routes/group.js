var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/list', function(req, res, next) {
  var data={
    "code":0,
    "msg":null,
    "data":{
      "list":[{
        "id": "1",
        "name": "开发组"
      }, {
        "id": "2",
        "name": "产品组"
      }]
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