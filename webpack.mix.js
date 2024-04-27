let mix = require('laravel-mix');

mix.ts('src/js/popup.ts', 'dist')
    .vue();
    
mix.sass('src/sass/popup.scss', 'dist');