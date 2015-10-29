var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var less = require('gulp-less');

gulp.task('build', ['images'], function () {
    gulp.src('src/styles/styles.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/styles'));

    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('images', function () {
    gulp.src('src/sprites/*')
        .pipe(spritesmith({
            imgName: 'images/sprite.png',
            cssName: 'styles/sprite.less',
            imgOpts: {
                quality: 90
            }
        }))
        .pipe(gulp.dest('./src'));

    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/styles/**/*.less', ['build']);
    gulp.watch('src/*.html', ['build']);
});
