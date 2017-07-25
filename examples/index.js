

// Require Adipisici
Adipisici = require( '../lib/adipisici.js' );

// Create an Adipisici Instance Server
website = new Adipisici( "My Website" );

// Begin Listening on Endpoints
website.startListening().then( () => {
    console.log( 'My Website is listening on port ' + website.server.settings.port );
});

// Connect to the Database and Start Data Modeling
website.connect_database().then( ( ) => {

    console.log( 'My website is connected to a mongo database at ' + website.mongo_url );

    // Blog Post Data Model
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
            type: "Markdown",
            default: "Lorem ipsum dolor sit amet."
        }

    } );


    // Blog Post Endpoints

    // Retrieve all blog posts
    var post_list = website.server.createEndpoint( 'get', '/blog', ( request ) => {
        return website.data_layer.all( 'blog_post' );
    } );

    // Retrieve a specific blog post
    var post_get = website.server.createEndpoint( 'get', '/blog/:blog_url', ( request ) => {
        return website.data_layer.find( 'blog_post', { url : request.params.blog_url } );
    } );

    // Upsert blog post
    var post_upsert = website.server.createEndpoint( 'put', '/blog/:blog_url', ( request ) => {
        return website.data_layer.upsert( 'blog_post', { url : request.params.blog_url }, request.body );
    } );

    // Edit blog post
    var post_edit = website.server.createEndpoint( 'patch', '/blog/:blog_url', ( request ) => {
        return website.data_layer.update( 'blog_post', { url : request.params.blog_url }, request.body );
    } );

    // Delete blog post
    var post_delete = website.server.createEndpoint( 'delete', '/blog/:blog_url', ( request ) => {
        return website.data_layer.delete( 'blog_post', { url : request.params.blog_url } );
    } );


    // Admin Panel

    website.admin_panel.connect_object( 'Post', {
        data_form : 'blog_post',
        display_by : 'name',
        index_by : 'url',
        endpoints : {
            list   : post_list,
            get    : post_get,
            upsert : post_upsert,
            edit   : post_edit,
            delete : post_delete
        }
    } );

}).catch( ( error ) => {
    console.log( error );
});

