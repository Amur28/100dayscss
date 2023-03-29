const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const styles = () => {
  return src("app/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowsersList: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src("app/js/script.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
};

const css = () => {
  return src([
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(concat('libs.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

const js = () => {
  return src([
    'node_modules/slick-carousel/slick/slick.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

const watching = () => {
  watch(["app/scss/*.scss"], styles);
  watch(["app/js/script.js"], scripts);
  watch(["app/index.html"]).on("change", browserSync.reload);
};

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
};

const cleanDist = () => {
  return src('docs')
    .pipe(clean())
}

const building = () => {
  return src([
    'app/css/style.min.css',
    'app/css/libs.min.css',
    'app/js/script.min.js',
    'app/js/libs.min.js',
    'app/index.html',
    'app/img/**/*'
  ], {base: 'app'})
    .pipe(dest('docs'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, css, scripts, js, browsersync, watching);
