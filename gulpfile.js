const {src, dest, series, watch} = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const process = require(`child_process`);
const plumber = require(`gulp-plumber`);
const rename = require(`gulp-rename`);
const gulpSass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const sourcemaps = require(`gulp-sourcemaps`);
const autoprefixer = require(`autoprefixer`);
const csso = require(`gulp-csso`);

function sass() {
  return src([`source/scss/style.scss`], {base: `source/scss/`})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(rename(`purchase-messages.css`))
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`build/assets/features/purchase-messages`))
    .pipe(browserSync.stream());
}


function copy() {
  return src([`source/**/*.html`, `source/assets/**/*`], {base: `source/assets/features/purchases/`})
    .pipe(dest(`build/assets/features/purchase-messages`)
    );
}

function server(cb) {
  browserSync.init({
    server: `build`,
    port: 4500,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  watch(`source/**/*.html`, series(copy, refresh));
  watch(`source/**/*.scss`, series(sass, refresh));
  watch(`source/**/*.js`, series(js, refresh));
  cb();
}

function js(cb) {
  process.exec(`npm run webpack`);
  cb();
}

function refresh(cb) {
  browserSync.reload();
  cb();
}

exports.default = series(copy, js, sass, server);
exports.build = series(copy, js, sass);
