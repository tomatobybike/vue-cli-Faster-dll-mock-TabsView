var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var path = require('path')
var browserSync = require('browser-sync').create()
var ROOT = path.resolve(__dirname)
var server = path.resolve(ROOT, 'mock')

// 服务器重启
gulp.task('nodemon', function(cb) {
  // 设个变量来防止重复重启
  var started = false
  var stream = nodemon({
    script: './mock/app.js',
    // 监听文件的后缀
    ext: 'js',
    env: {
      NODE_ENV: 'development'
    },
    // 监听的路径
    watch: [server]
  })
  stream
    .on('start', function() {
      if (!started) {
        cb()
        started = true
      }
    })
    .on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10)
    })
})

// browser-sync配置，配置里启动nodemon任务
gulp.task(
  'browser-sync',
  gulp.series('nodemon', function() {
    // browserSync.init(null);
    // browserSync.init(null, {
    //   proxy: "http://localhost:8181",
    //   port: 8081
    // });
  })
)

// browser-sync 监听文件
gulp.task(
  'mock',
  gulp.series('browser-sync', 'nodemon', function() {
    // Do something after a, b, and c are finished.
    gulp.watch(['./mock/app.js', './mock/routes/**'], ['bs-delay'])
  })
)

// 延时刷新
gulp.task('bs-delay', function() {
  setTimeout(function() {
    browserSync.reload()
    console.log('restart')
  }, 1000)
})
