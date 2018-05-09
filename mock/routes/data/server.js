var $config = require('../../conf/config');
var $maxUploadSize = $config.maxUploadSize;
var $mime = require("../../conf/mime").types;
var $util = require('../../util/util');
var express = require('express');
var moment = require('moment');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var UPLOAD_FOLDER = $config.UPLOAD_FOLDER;
var getMime=function(fileType){
  for(var i in $mime){
    if(fileType==$mime[i]){
      return i;
    }
  }
}
router.post('/', function(req, res) {
    debugger;
    var maxSizeNumber=$maxUploadSize;
    var maxSize = maxSizeNumber * 1024 * 1024;

    var form = new formidable.IncomingForm();   //创建上传表单

    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 20 * 1024 * 1024;   //文件大小
    var path = 'public' + UPLOAD_FOLDER ;
    var obj = {};
    form.on('field', function(name, value) {
      if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
        obj[name] = value;
      }
    });

    console.log('maxSize='+maxSize);
    //消息头判断文件长度不是很准确
    var size = req.headers['content-length'];
    if(size > maxSize)
    {
      console.error('文件过大了');
      res.status(500).json({code:'400','msg': '文件不能大于 '+maxSizeNumber+'MB'});
      res.end();
      return false;
    }

    form.on('error', function(err) {
      res.status(500).json({code:'400','msg': 'Some error'});
      return;
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
      console.log(bytesReceived); //This is just to view progress
      if (bytesReceived > maxSize)
      {
        form.__2big__ = true;
      }
    });
    form.on('end', function() {
      console.log('end');
    });
    form.parse(req, function(err, fields, files) {
      //fs.unlinkSync(files.file.path);//直接删除文件

      console.log(files.file.type);

      var gClassId=obj.gClassId;
      console.error('gClassId='+gClassId);
      var extName = '';  //后缀名
      extName=getMime(files.file.type);
      //if(!extName){
      //  res.status(500).json({code:'400','msg': '只支持png、jpg和gif格式图片'});
      //  fs.unlinkSync(files.file.path);//直接删除文件
      //  return;
      //}
      if(form.__2big__){
        res.status(500).json({code:'400','msg': '文件不能大于  '+maxSizeNumber+'MB'});
        fs.unlinkSync(files.file.path);//直接删除文件
        console.log('删除成功');

        return;
      }


      var now=moment().format('YYYYMMDDHHmmssms');
      var avatarName = now+parseInt(Math.random()*(9999-1000)+1000) + '.' + extName;
      var newPath = form.uploadDir + avatarName;
      fs.renameSync(files.file.path, newPath);  //重命名
      console.log('文件生成成功');
      var i={
        code:'200',
        msg: 'success',
        data:''
      }
    $util.delayed(function(){
        res.status(i.code).json(i);
    },20000);

      req.body.gClassId=gClassId;
      req.body.pictureUrl=avatarName;

    });


});

module.exports = router;
