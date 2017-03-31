
// Require Adipisici
Adipisici = require( '../lib/adipisici.js' );

// Create and initialize Adipisici server
website = new Adipisici( "My Website", "mongodb://localhost:27017/mywebsite", 8080 );

// Data Modeling
website.connect_database().then( function( ) {

    website.createDataForm( 'blog_post', {

        name : {
            type: String,
            required: true
        },

        url : {
            type: String,
            required: true,
            unique: true
        },

        summary : {
            type : String,
            required: false
        },

        reads : {
            type : Number,
            default: 0
        },

        content : {
            type: String,
            default: "Lorem ipsum dolor sit amet."
        }

    } );

}).catch( function( error ) {
    console.log( error );
});


// Blog Post Endpoints

// Retrieve all blog posts
website.server.createEndpoint( 'get', '/blog', function( request ) {
    return website.data_layer.all( 'blog_post' );
} );

// Retrieve a specific blog post
website.server.createEndpoint( 'get', '/blog/:blog_url', function(request ) {
    return website.data_layer.find( 'blog_post', { url : request.params.blog_url } );
} );

// Upsert blog post
website.server.createEndpoint( 'put', '/blog/:blog_url', function(request ) {
    return website.data_layer.upsert( 'blog_post', { url : request.params.blog_url }, request.body );
} );

// Edit blog post
website.server.createEndpoint( 'patch', '/blog/:blog_url', function(request ) {
    return website.data_layer.update( 'blog_post', { url : request.params.blog_url }, request.body );
} );

// Delete blog post
website.server.createEndpoint( 'delete', '/blog/:blog_url', function(request ) {
    return website.data_layer.delete( 'blog_post', { url : request.params.blog_url } );
} );
