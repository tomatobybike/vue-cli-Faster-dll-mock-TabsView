var $util = require('../util/util');
var express = require('express');
var router = express.Router();

router.all('/weather', function(req, res, next) {
    var data={"data":{"source":"qihoo","areaid":"101231001","forecast":[{"date":"2018-03-26","sunrise":"05:46","sunset":"18:00","temperatureDay":"23","temperatureNight":"17","weatherDay":"多云","weatherIdDay":"01","weatherNight":"多云","weatherIdNight":"01","windForceDay":"6-7级","windDirectionDay":"东南风","windForceNight":"6-7级","windDirectionNight":"东南风","serverTime":1522035303328},{"date":"2018-03-27","sunrise":"05:45","sunset":"18:00","temperatureDay":"23","temperatureNight":"20","weatherDay":"多云","weatherIdDay":"01","weatherNight":"晴","weatherIdNight":"00","windForceDay":"5-6级","windDirectionDay":"东风","windForceNight":"6-7级","windDirectionNight":"东南风","serverTime":1522035303328},{"date":"2018-03-28","sunrise":"05:44","sunset":"18:01","temperatureDay":"24","temperatureNight":"20","weatherDay":"晴","weatherIdDay":"00","weatherNight":"晴","weatherIdNight":"00","windForceDay":"6-7级","windDirectionDay":"东风","windForceNight":"6-7级","windDirectionNight":"东风","serverTime":1522035303328}],"condition":{"windSpeed":"7.8m/s","windDirection":"北风","windForce":"4级","weather":"多云","weatherId":"01","temperature":"17","realFeelTemperature":"16","humidity":"85","pressure":"1014","visibility":"11800","precipitation":"0.0","publishTime":"2018-03-26 15:51:00","serverTime":1522051265728},"aqi":{"PM25":"","PM10":"","SO2":"","NO2":"","CO":"","O3":"","AQI":"","AQILevel":"0","AQIWarn":"老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动","maxPoll":"","publishTime":"2018-03-26 15:00:00","serverTime":1522051382488},"aqiforecast":[]},"code":0,"msg":"OK"}
    //data={"result":false,"error":"imei\/m1\/emmc\/cpu\/product \u5fc5\u586b\u9009\u4e00\u4e2a"}
    $util.delayed(function(){
        res.json(data);
    },500);
});



module.exports = router;
