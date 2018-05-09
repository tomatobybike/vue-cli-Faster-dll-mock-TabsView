var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/rule/list', function(req, res, next) {
  var data={
    "code":0,
    "msg":null,
    "data":{
      "pageNum":1,
      "pageSize":20,
      "size":2,
      "startRow":1,
      "endRow":2,
      "total":2,
      "pages":1,
      "list":[
        {
          "id":5,
          "name":"www222",
          "creater":"session account",
          "note":"wee",
          "createdate":1524453842933,
          "lastupdate":1524475110214,
          "status":"D",
          "items":[
            {
              "id":1,
              "ruleid":5,
              "source":"taobao",
              "limit":2,
              "createdate":1524453842933,
              "lastupdate":1524463924112
            },
            {
              "id":2,
              "ruleid":5,
              "source":"360",
              "limit":2,
              "createdate":1524453842933,
              "lastupdate":1524463924112
            },
            {
              "id":3,
              "ruleid":5,
              "source":"custom",
              "limit":2,
              "createdate":1524453842933,
              "lastupdate":1524463924112
            }
          ]
        },
        {
          "id":6,
          "name":"搜索",
          "creater":"session account",
          "note":"sf",
          "createdate":1524468649929,
          "lastupdate":1524468649929,
          "status":"N",
          "items":[
            {
              "id":4,
              "ruleid":6,
              "source":"淘宝",
              "limit":2,
              "createdate":1524468649929,
              "lastupdate":1524468649929
            },
            {
              "id":5,
              "ruleid":6,
              "source":"360",
              "limit":4,
              "createdate":1524468649929,
              "lastupdate":1524468649929
            },
            {
              "id":6,
              "ruleid":6,
              "source":"自定义",
              "limit":1,
              "createdate":1524468649929,
              "lastupdate":1524468649929
            }
          ]
        }
      ],
      "prePage":0,
      "nextPage":0,
      "isFirstPage":true,
      "isLastPage":true,
      "hasPreviousPage":false,
      "hasNextPage":false,
      "navigatePages":8,
      "navigatepageNums":[
        1
      ],
      "navigateFirstPage":1,
      "navigateLastPage":1,
      "firstPage":1,
      "lastPage":1
    }
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },500);
});

router.all('/rule/create', function(req, res, next) {
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

router.all('/rule/update', function(req, res, next) {
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

router.all('/rule/delete', function(req, res, next) {
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


router.all('/rule/sources', function(req, res, next) {
  var data={
    "code":0,
    "msg":"OK",
    "data":[
      "jd",
      "custom"
    ]
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },1);
});


router.all('/custom/list', function(req, res, next) {
  var data={
    "code":0,
    "msg":null,
    "data":{
      "pageNum":1,
      "pageSize":20,
      "size":2,
      "startRow":1,
      "endRow":2,
      "total":2,
      "pages":1,
      "list":[
        {
          "id":5,
          "title":"www222",
          "creater":"session account",
          "note":"wee",
          "createdate":1524453842933,
          "lastupdate":1524475110214,
          "status":"D",
          "url":'http://www.baidu.com'
        },
        {
          "id":6,
          "title":"搜索",
          "creater":"session account",
          "note":"sf",
          "createdate":1524468649929,
          "lastupdate":1524468649929,
          "status":"N",
          "url":'http://www.taobao.com'
        }
      ],
      "prePage":0,
      "nextPage":0,
      "isFirstPage":true,
      "isLastPage":true,
      "hasPreviousPage":false,
      "hasNextPage":false,
      "navigatePages":8,
      "navigatepageNums":[
        1
      ],
      "navigateFirstPage":1,
      "navigateLastPage":1,
      "firstPage":1,
      "lastPage":1
    }
  }
  // data.code = 999
  $util.delayed(function(){
    res.json(data);
  },500);
});

router.all('/custom/create', function(req, res, next) {
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

router.all('/custom/update', function(req, res, next) {
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

router.all('/custom/delete', function(req, res, next) {
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
