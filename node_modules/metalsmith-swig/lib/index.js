var basename = require( 'path' ).basename,
	dirname  = require( 'path' ).dirname,
	extname  = require( 'path' ).extname,
	extend   = require( 'extend' ),
	swig     = require( 'swig' ),
	twig     = require( 'twig' ).twig;

var extensions = /\.(twig|swig)$/;

var plugin = function ( options ) {
	options = options || { engine: 'twig' };

	return function ( files, metalsmith, done ) {
		var metadata = metalsmith.metadata();

		if ( !!metadata.urls ) {
			Object.keys( metadata.urls ).forEach( function ( key ) {
				var u                = metadata.urls[ key ];
				var v                = u.replace( extensions, '' );
				metadata.urls[ key ] = v;
			} );
		}

		var templates_dir = options.directory || metalsmith.source();

		setImmediate( done );
		Object.keys( files ).forEach( function ( file ) {
			if ( !is_swig( file ) ) {
				return;
			}
			var data = files[ file ];
			var dir  = dirname( file );
			var html = basename( file, extname( file ) );

			if ( html.substr( 0, 1 ) == '_' ) {
				delete files[ file ];
				return;
			}

			if ( '.' != dir ) {
				html = dir + '/' + html;
			}

			if ( !!data.url ) {
				data.url = data.url.replace( extensions, '' );
			}

			if ( !!data.absolute_url ) {
				data.absolute_url = data.absolute_url.replace( extensions, '' );
			}

			var locals = extend( {}, metadata, data );

			var str;
			if ( options.engine == 'twig' ) {
				var tmpl  = twig( { data: data.contents.toString() } );
				tmpl.path = templates_dir + '/' + file;
				str       = tmpl.render( locals );
			}
			else if ( options.engine == 'swig' ) {
				str = swig.render( data.contents.toString(), { locals: locals, filename: templates_dir + '/' + file } );
			}

			data.contents = new Buffer( str );

			delete files[ file ];
			files[ html ] = data;
		} );
	};
}

function is_swig( file ) {
	return extensions.test( extname( file ) );
};

module.exports = plugin;
