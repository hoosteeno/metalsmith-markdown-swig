var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var inplace = require('metalsmith-in-place');
var markdown = require('metalsmith-data-markdown');

metalsmith(__dirname)
  .use(inplace({
    engine: 'swig',
    pattern: '**/*.html',
    autoescape: false,
  }))
  .use(markdown({
  }))
  .build(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.info('✫ Built it. ✫');
    }
  });
