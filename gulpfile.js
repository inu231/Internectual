var elixir = require('laravel-elixir');
var liveReload = require('gulp-livereload');
var clean = require('rimraf');
var gulp = require('gulp');

var config = {
    assets_path: './resources/assets',
    build_path: './public/build'
};

config.bower_path = config.assets_path + '/../bower_components';

config.build_path_js = config.build_path + '/js';
config.build_path_js_controllers = config.build_path_js + '/controllers';
config.build_vendor_path_js = config.build_path_js  + '/vendor';


config.vendor_path_js = [
    config.bower_path + '/jquery/dist/jquery.min.js',
    config.bower_path + '/bootstrap/dist/js/bootstrap.min.js',
    config.bower_path + '/angular/angular.min.js',
    config.bower_path + '/angular-route/angular-route.min.js',
    config.bower_path + '/angular-resource/angular-resource.min.js',
    config.bower_path + '/angular-animate/angular-animate.min.js',
    config.bower_path + '/angular-messages/angular-messages.min.js',
    config.bower_path + '/angular-bootstrap/ui-bootstrap.min.js',
    config.bower_path + '/angular-strap/dist/modules/navbar.min.js',
    config.bower_path + '/angular-cookies/angular-cookies.min.js',
    config.bower_path + '/query-string/query-string.js',
    config.bower_path + '/angular-oauth2/dist/angular-oauth2.min.js'
];

config.build_path_css = config.build_path + '/css';
config.build_vendor_path_css = config.build_path_css  + '/vendor';
config.vendor_path_css = [
    config.bower_path + '/bootstrap/dist/css/bootstrap.min.css',
    config.bower_path + '/bootstrap/dist/css/bootstrap-theme.min.css'
];

config.build_path_html = config.build_path + '/views';
config.build_path_fonts = config.build_path + '/fonts';
config.build_path_images = config.build_path + '/images';


gulp.task('copy-images', function(){
    gulp.src([
        config.assets_path + '/images/**/*'
    ])
        .pipe(gulp.dest(config.build_path_images))
        .pipe(liveReload());

});

gulp.task('copy-fonts', function(){
    gulp.src([
        config.assets_path + '/fonts/**/*'
    ])
        .pipe(gulp.dest(config.build_path_fonts))
        .pipe(liveReload());

});

gulp.task('copy-html', function(){
    gulp.src([
        config.assets_path + '/js/views/**/*.html'
    ])
        .pipe(gulp.dest(config.build_path_html))
        .pipe(liveReload());

});


/**
 *  Tarefa que Movéra todos os stipos CSS para a pasta public/build/css
 *
 *
 **/

gulp.task('copy-styles', function(){
    gulp.src([
        config.assets_path  + '/css/**/*.css'
    ])
        .pipe(gulp.dest(config.build_path_css))
        .pipe(liveReload());

    gulp.src(config.vendor_path_css)
        .pipe(gulp.dest(config.build_vendor_path_css))
        .pipe(liveReload());
});

/**
 *  Tarefa que Movéra todos os tipos JS para a pasta public/build/js
 *
 *
 **/


gulp.task('copy-scripts', function(){
    gulp.src([
        config.assets_path + '/js/**/*.js'
    ])
        .pipe(gulp.dest(config.build_path_js))
        .pipe(liveReload());

    gulp.src(config.vendor_path_js)
        .pipe(gulp.dest(config.build_vendor_path_js))
        .pipe(liveReload());


    /* gulp.src(config.vendor_path_js)
     .pipe(gulp.dest(cconfig.build_path_js_controllers))
     .pipe(liveReload()); */



});

/**
 *  Tarefa que apaga todos os arquivos da pasta public/build
 *
 */

gulp.task('clear-build-folder', function(){
    clean.sync(config.build_path);
});


/**
 *  Essa tarefa irá concatenar o conteúdo de todos os arquivos css e js para
 *  os arquivos all.js e all.cs com os método mix.styles e mix.scripts.
 *  O método que fazs a concatenação é o concat. O mix.version versione e gera um número
 *  aleatório todas as vezes que estes arquivos forem criados la na pasta public.
 *
 **/


gulp.task('default', ['clear-build-folder'], function(){

    gulp.start('copy-html', 'copy-fonts', 'copy-images');
    elixir(function(mix){
        mix.styles(config.vendor_path_css.concat([config.assets_path + '/css/**/*.cs']),
            'public/css/all.cs', config.assets_path);

        mix.scripts(config.vendor_path_js.concat([config.assets_path + '/js/**/*.js']),
            'public/js/all.js', config.assets_path);

        mix.version(['js/all.js', 'css/all.cs']);
    });
});


/**
 *  Tarefa que execuat as terafas de copias dos arquivos que estão na pasta resources
 *  para a pasta public/build. Antes de ser executada, ela executa o task clear-build-folder
 *  que faz a limpeza da pasta public antes de fazermos uma nova cópia
 */

gulp.task('watch-dev',['clear-build-folder'],function(){
    liveReload.listen();
    gulp.start('copy-styles', 'copy-scripts', 'copy-html', 'copy-fonts', 'copy-images');
    gulp.watch(config.assets_path + '/**', ['copy-styles', 'copy-scripts', 'copy-html']);
});


