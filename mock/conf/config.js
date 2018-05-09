/**
 * Created by yangqiong on 2017/2/22.
 */
// conf/db.js
//
module.exports = {
    config: {
        title:'server',
        static: 'public/dist',    //Production
        delayedTime:200  //模拟异步接口请求事件耗时慢情况
    },
    UPLOAD_FOLDER:'/art/',
    maxUploadSize:3 //MB
};
