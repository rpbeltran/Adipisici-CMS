

// Require Adipisici
Adipisici = require( '../lib/adipisici.js' );

// Create and initialize Adipisici server
website = new Adipisici( "My Website" );

website.startListening().then( () => {
    console.log( 'My Website is listening on port ' + website.server.settings.port );
});

// Data Modeling
website.connect_database().then( ( ) => {

    console.log( 'My website is connected to a mongo database at ' + website.mongo_url );

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

}).catch( ( error ) => {
    console.log( error );
});


// Blog Post Endpoints

// Retrieve all blog posts
website.server.createEndpoint( 'get', '/blog', ( request ) => {
    return website.data_layer.all( 'blog_post' );
} );

// Retrieve a specific blog post
website.server.createEndpoint( 'get', '/blog/:blog_url', ( request ) => {
    return website.data_layer.find( 'blog_post', { url : request.params.blog_url } );
} );

// Upsert blog post
website.server.createEndpoint( 'put', '/blog/:blog_url', ( request ) => {
    return website.data_layer.upsert( 'blog_post', { url : request.params.blog_url }, request.body );
} );

// Edit blog post
website.server.createEndpoint( 'patch', '/blog/:blog_url', ( request ) => {
    return website.data_layer.update( 'blog_post', { url : request.params.blog_url }, request.body );
} );

// Delete blog post
website.server.createEndpoint( 'delete', '/blog/:blog_url', ( request ) => {
    return website.data_layer.delete( 'blog_post', { url : request.params.blog_url } );
} );
