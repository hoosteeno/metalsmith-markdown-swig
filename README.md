# metalsmith-markdown-swig

This repo answers [a question posed on Stackoverflow](http://stackoverflow.com/questions/35701173/how-do-i-set-up-multiple-content-areas-in-metalsmith/37596839#37596839).

It shows how to use Metalsmith to build a single page that includes several bits of markdown from individual markdown files.

There are two releases: 

1. The first shows how to do this by putting template tags in markdown, and using [a custom renderer](https://github.com/hoosteeno/metalsmith-markdown-swig/blob/custom_renderer/build.js#L9) to pass them through to the template engine.
2. [The second](https://github.com/hoosteeno/metalsmith-markdown-swig/tree/data_markdown) shows how to do this using the metalsmith-data-markdown plugin and template inheritance.

Number 2 above is cleaner, but number 1 shows how easy it is to modify how Metalsmith does stuff.
