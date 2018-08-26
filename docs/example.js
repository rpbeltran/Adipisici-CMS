
// ----- Require Adipisici -----

Adipisici = require( './adipisici/lib/adipisici.js' );



// ----- Create and initialize Adipisici server -----

website = new Adipisici( { 

    secret_path : 'secrets.json',

    port : 8080,

    admin_panel : "/admin_panel"

} );



// ----- Create Data Models -----

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

    content : {
        type: String,
        default: "Lorem ipsum dolor sit amet."
    }

} );



// ----- Create HTTP Endpoints -----


// --- Public Endpoints ---

// - Get all

website.server.create_restpoint (
    
    {
        'method'      : 'get',
        'extension'   : '/blog/',
        'permissions' : [ ]
    },

    ( request ) => {
        return website.data_layer.all( 'blog_post' );
    }
    
);

// - Get one

website.server.create_restpoint (
    {
        'method'      : 'get',
        'extension'   : '/blog/:blog_url',
        'permissions' : [ ]
    }, 
    ( request ) => {
        return website.data_layer.find( 'blog_post', { url : request.params.blog_url } );
    }
);


// --- Private Endpoints ---

// - Upsert ( Insert or Update )

website.server.create_restpoint (   
    {
        'method'      : 'put',
        'extension'   : '/blog/:blog_url',
        'permissions' : [ "write:blog_post" ]
    }, 
    ( request ) => {
        return website.data_layer.upsert( 'blog_post', { url : request.params.blog_url }, request.body );
    }
);

// - Update

website.server.create_restpoint (    
    {
        'method'      : 'patch',
        'extension'   : '/blog/:blog_url',
        'permissions' : [ "write:blog_post" ]
    }, 
    ( request ) => {
        return website.data_layer.update( 'blog_post', { url : request.params.blog_url }, request.body );
    }
);

// - Delete

website.server.create_restpoint (    
    {
        'method'      : 'delete',
        'extension'   : '/blog/:blog_url',
        'permissions' : [ "write:blog_post" ]
    }, 
    ( request ) => {
        return website.data_layer.delete( 'blog_post', { url : request.params.blog_url } );
    }
);
