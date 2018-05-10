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
  var data={"code":0,"data":{"roles":["editor"],"name":"yangqiong"}}
  data.data.owerMenus=[
    {
      path: '',
      name: 'hello',
      children: [
        {
          path: 'hello',
          name: 'Kickerteam',
          meta: {title: '巴萨罗那'}
        }
      ]
    },
    {
      path: '',
      redirect: '/table',
      alwaysShow: true, // will always show the root menu
      name: 'regulation',
      meta: {title: 'Example', icon: 'rule'},
      children: [
        {
          path: 'kickerteamx',
          name: 'Kickerteam',
          meta: {title: '球队'}
        },
        {
          path: 'hotspots',
          name: 'Hotspots',
          meta: {title: '球员'}
        },
        {
          path: 'table',
          name: 'Table',
          meta: {title: '表格'}
        },
        {
          path: 'table2',
          name: 'Table2',
          meta: {title: '表格'}
        },
        {
          path: 'tree',
          name: 'Tree',
          meta: {title: '树'}
        }
      ]
    }
  ]
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
