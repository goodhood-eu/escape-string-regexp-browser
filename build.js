const fs = require('fs');

const bundler = require('browserify')('./src/index.js');
bundler.transform(require('babelify'), { global: true });

bundler.transform(require('loose-envify'), { global: true });
bundler.transform(require('uglifyify'), {
  mangle: true,
  compress: { drop_console: true },
  output: { max_line_len: 64000 },
  global: true,
});
bundler.plugin(require('bundle-collapser/plugin'));

bundler.bundle((error, buffer) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  }

  fs.writeFileSync('lib/index.js', buffer);
});
