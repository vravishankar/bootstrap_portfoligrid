const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile and Inject SaaS files
gulp.task('sass',function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Move Javascript files to dist folder
gulp.task('js',function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Move Fonts to dist/fonts folder
gulp.task('fonts',function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

// Move font-awesome css to dist/css folder
gulp.task('fa',function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('dist/css'));
});

// Serve and Watch
gulp.task('serve',['sass'],function() {
    browserSync.init({
        server: './dist'
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass'])
    //gulp.watch('src/*.html').on('change',['bs-reload']);
    gulp.watch('*.html',['bs-reload']);
});

gulp.task('html',function() {
    return gulp.src('*.html')
    .pipe(gulp.dest('dist/'));
})

// Reload browser-sync
gulp.task('bs-reload',['html'],function(done) {
    browserSync.reload();
    done();
})

gulp.task('default',['serve','js','fa','fonts','html']);