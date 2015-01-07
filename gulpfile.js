var gulp      = require('gulp');
var gutil     = require('gulp-util');
var clean     = require('gulp-clean');
var markdown  = require('gulp-markdown');
var path      = require('path');
var routes = require('./routes');

var paths = {
  src: "markdowns/**/*.md",
  app: ["routes/**/*.js", "views/**/*.jade"],
  dest: "public/contents",
  public: "public"
},
  PORT =  4000,
  LIVE_RELOAD_PORT = 35729,
  config = {};



gulp.task('clean', function () {
  return gulp.src(paths.dest, {read: false})
    .pipe(clean({force: true}));
});

gulp.task('start', function () {
  gutil.log(gutil.colors.green('------------------------------'));
  gutil.log(gutil.colors.green('Starting App'));
  gutil.log(gutil.colors.green('------------------------------'));
});

gulp.task('markdown', function () {
  return gulp.src(paths.src)
    .pipe(markdown())
    .pipe(gulp.dest(paths.dest))
    .pipe(livereload(config.tlr));
});

gulp.task('app', function () {
  return gulp.src(paths.app).pipe(livereload(config.tlr));
});

gulp.task('watch', function() {
  startLivereload();
  startExpress();

  gulp.watch(paths.src,  ['markdown']);
  gulp.watch(paths.app,  ['app']);
});

gulp.task('default', ['clean'], function () {
  gulp.start('start', 'watch', 'markdown');
});





function startExpress() {
  var express = require('express'),
    app = express();
  app.use(require('connect-livereload')({ port: LIVE_RELOAD_PORT }));
  app.use(express.static(path.join(__dirname, paths.public)));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.listen(PORT);

  routes.route(app);
  gutil.log('Express listening on: ' + gutil.colors.magenta(PORT));
}

function startLivereload() {
  config.tlr = require('tiny-lr')();
  config.tlr.listen(LIVE_RELOAD_PORT, function (err) {
    if (err) throw err.message;
    gutil.log('Live reload server listening on: ' + gutil.colors.magenta(LIVE_RELOAD_PORT));
  });
}

function livereload(server) {
  var Transform = require('stream').Transform,
    reload = new Transform({ objectMode: true });

  reload.changed = function (filePath) {
    gutil.log(gutil.colors.magenta(path.basename(filePath)) + ' was reloaded.');
    server.changed({
      body: {
        files: [filePath]
      }
    });
  };

  reload._transform = function (file, encoding, next) {
    reload.changed(file.path);
    this.push(file);
    next();
  };

  return reload;
}