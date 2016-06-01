
# metalsmith-swig

  Compiles twig files using twig (https://github.com/justjohn/twig.js) or swig (http://paularmstrong.github.io/swig/)

## Install

```bash
  npm install metalsmith-swig
```

## Usage

```js
var Metalsmith = require( 'metalsmith' ),
	metal_twig = require( 'metalsmith-swig' );

Metalsmith( __dirname )
	.source( './src' )
	.destination( './dist' )
	.use( metal_twig() )
	.build( function ( err ) {
		if ( err ) {
			throw err;
		}
	} );

```

## Options:

* `engine`: *(default: twig)* Set the engine (twig|swig). Set to *swig* to use swig as in v1.0.0

## License

  MIT