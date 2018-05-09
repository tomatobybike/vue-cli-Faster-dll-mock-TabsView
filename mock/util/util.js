var $config = require('../conf/config');
module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    isMobile:function (req) {
        navigator.userAgent.toLowerCase()
      var userAgent = req.headers['user-agent'].toLowerCase();
      if ( /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( userAgent ) ) {
        //console.log('手机端');
        return 1;
      }else{
        //console.log('PC端');
        return 0;
      }
    },
    delayed:function(callback,time){
        var delayedTime=$config.config.delayedTime;
        if(time){
            delayedTime=time;
        }
        setTimeout(function(){
            callback && callback();
        },delayedTime);
    }

}
