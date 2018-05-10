var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/list', function(req, res, next) {
  var data={
    "code":0,
    "msg":null,
    "data":{
      "total":200,
      "list":[{
        "id": "1",
        "userName": "露西",
        "userEmail": "lucy@126.com",
        "userPhone": "15611111111",
        "isAdmin":true,
        "groupId": "1",
        "groupName": "开发组",

      }, {
        "id": "2",
        "userName": "杰克",
        "userEmail": "jacky@126.com",
        "userPhone": "15611111111",
        "isAdmin":false,
        "groupId": "2",
        "groupName": "商务组"
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