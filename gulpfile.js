var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sass = require("gulp-sass");
var paths = {
  pages: ["src/*.html"]
};

gulp.task("copy-scss", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("copy-html", function() {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("default", function() {
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/index.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist/js"));
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/subPage.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("subPage.js"))
    .pipe(gulp.dest("dist/js"));
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/components.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("components.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("build", function() {
  gulp.watch("src/ts/*.ts", ["default"]);
  gulp.watch("src/*.html", ["copy-html"]);
  gulp.watch("src/**/*.html", ["copy-html"]);
  gulp.watch("src/**/*.scss", ["copy-scss"]);
});
