const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

function compilaSass() {
    return gulp.src("./source/styles/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:"compressed"
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./build/styles"))
}

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./build/images'));
}

function comprimeScripts() {
    return gulp.src('./source/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/scripts'));
}

function funcaoPadrao(callback) {
    console.log("executando via gulp");
    callback();
}

exports.default = funcaoPadrao;
exports.sass = compilaSass;
exports.images = comprimeImagens;
exports.scripts = comprimeScripts;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
    gulp.watch('./source/images/*', gulp.series(comprimeImagens));
    gulp.watch('./source/scripts/*.js', gulp.series(comprimeScripts));
}