const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數
const gulpSequence = require('gulp-sequence').use(gulp);
const pug = require('gulp-pug');

// production || development
// # gulp --env production
const envOptions = {
  string: 'env',
  default: { env: 'development' }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('clean', () => {
  return gulp.src(['./public', './.tmp'], { read: false }) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
    .pipe($.clean());
});

gulp.task('vendorJs', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.slim.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  ])
  .pipe($.concat('vendor.js'))
  .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('sass', function () {
  // PostCSS AutoPrefixer
  var processors = [
    autoprefixer({
      browsers: ['last 5 version'],
    })
  ];

  return gulp.src(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({ 
      outputStyle: 'nested',
      includePaths: ['./node_modules/bootstrap/scss']
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.if(options.env === 'production', $.minifyCss())) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('copy', function () {
  gulp.src(['./source/**/**', '!source/stylesheets/**/**'])
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  })
});

// 自行增加 pug
gulp.task('pug', function(){
  // return gulp.src(['./source/*.pug', './source/page/*.pug'])
  return gulp.src('./source/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./source'));
});
// gulp.task('pug', function () {
//   return gulp.src('./source/page/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('./source/page'));
// });



// watch 監控資料夾。當資料夾有變動的時候
gulp.task('watch', function () {
  gulp.watch(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['./source/**/**', '!/source/stylesheets/**/**'], ['copy']);
  // gulp.watch(['./source/*.pug', './source/page/*.pug'], ['pug']);
  // gulp.watch(['./source/*.pug'],['./source/page/*.pug'], ['pug']);
  gulp.watch(['./source/*.pug'], ['pug']);
  // gulp.watch(['./source/*.pug', '!/source/page/*.pug'], ['pug']);
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

gulp.task('sequence', gulpSequence('clean', 'copy', 'sass', 'vendorJs', 'sass'));

// 執行 "gulp" 就可以執行全部 task('default') 裡所有的方法，不須每個下指令 gulp sass, gulp copy...
gulp.task('default', ['copy', 'sass', 'vendorJs', 'browserSync', 'pug', 'watch']);
gulp.task('build', ['sequence']);



