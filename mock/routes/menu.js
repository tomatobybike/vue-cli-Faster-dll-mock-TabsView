var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/list', function(req, res, next) {
  var data={"code":0,"data":[{
    "id":1,
    "path": "",
    "name": "hello",
    "children": [{
      "path": "hello",
      "name": "Kickerteam",
      "meta": {
        "title": "巴萨罗那"
      }
    }]
  }, {
    "id":2,
    "path": "/kicker",
    "redirect": "/table",
    "alwaysShow": true,
    "name": "regulation",
    "meta": {
      "title": "欧洲足球联盟",
      "icon": "rule"
    },
    "children": [{
      "id":3,
      "path": "kickerteamx",
      "name": "Kickerteam",
      "meta": {
        "title": "球队"
      }
    }, {
      "id":4,
      "path": "hotspots",
      "name": "Hotspots",
      "meta": {
        "title": "球员"
      }
    }, {
      "id":5,
      "path": "table",
      "name": "Table",
      "meta": {
        "title": "表格"
      }
    }, {
      "id":6,
      "path": "table2",
      "name": "Table2",
      "meta": {
        "title": "表格"
      }
    }, {
      "id":7,
      "path": "tree",
      "name": "Tree",
      "meta": {
        "title": "树"
      }
    }]
  }]}

  $util.delayed(function(){
    res.json(data);
  },500);
});


module.exports = router;
