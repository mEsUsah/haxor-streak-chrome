let mix = require('laravel-mix');

mix.js('src/js/popup.js', 'dist')
    .vue();
    
mix.sass('src/sass/popup.scss', 'dist');