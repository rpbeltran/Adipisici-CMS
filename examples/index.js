
// Require Adipisici
Adipisici = require( './lib/adipisici' );

// Create and initialize Adipisici server
website = new Adipisici( "My Website", "mongodb://localhost:27017/mywebsite", 8080 );

// Data Modeling
website.database.initiate_connection().then( function( ) {

    website.createDataForm( 'blog_post',
        {

            name : {
                required: true
            },

            url : {
                required: true,
                unique: true
            },

            cover : {
            	required: false
            },

            summary : { 
            	required: false
            }

        }
    );

}).catch( function( error ) {
    console.log( error );
});


// Blog Post Endpoints

// Retrieve all blog posts
website.server.createEndpoint( 'get', '/blog', function(request ) {
    return website.database.allDocuments( 'blog_post' );
} );

// Retrieve a specific blog post
website.server.createEndpoint( 'get', '/blog/:blog_url', function(request ) {
    return website.database.find( 'blog_post', { url : request.params.blog_url } );
} );

// Upsert blog post
website.server.createEndpoint( 'put', '/blog/:blog_url', function(request ) {
    return website.format( 'blog_post', request.body ).then( function( entry ) {
        website.database.upsert( 'blog_post', { url : request.params.blog_url }, entry );
    } ) ;
} );

// Edit blog post
website.server.createEndpoint( 'patch', '/blog/:blog_url', function(request ) {
    return website.database.update( 'blog_post', { url : request.params.blog_url }, request.body );
} );

// Delete blog post
website.server.createEndpoint( 'delete', '/blog/:blog_url', function(request ) {
    return website.database.delete( 'blog_post', { url : request.params.blog_url } );
} );
