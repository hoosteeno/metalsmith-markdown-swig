var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var inplace = require('metalsmith-in-place');
var filenames = require('metalsmith-filenames');

var marked = require('marked');
var swigRenderer = new marked.Renderer();

swigRenderer.paragraph = function(text) {
  if (/^{%.+?%}/.test(text)) {
    text = text.replace(/\&quot;/g, '"');
    return text;
  }
  return '<p>' + text + '</p>\n';
};

metalsmith(__dirname)
  .use(markdown({
    renderer: swigRenderer,
  }))
  .use(filenames())
  .use(inplace({
    engine: 'swig',
    pattern: '**/*.html',
    autoescape: false,
  }))
  .build(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.info('✫ Built it. ✫');
    }
  });
