

Adipisici = require( '../lib/adipisici' );

// Create and initialize Adipisici server

computationist = new Adipisici( "Computationist", "mongodb://localhost:27017/computationist", 3000 );

computationist.database.initiate_connection().then( function( ) {

    computationist.createDataForm( 'algorithms',

        {
            name : {
                required: true,
                unique: true,
                indexed: true
            },

            popularity : {
                default: 0,
                indexed: true
            },

            url : {
                required: true,
                unique: true
            },

            'short description' : {
                default: ""
            },

            'long description' : {
                default: ""
            },

            'visualization url' : { },

            'visualization dependencies' : { },

            psuedocode : { }
        }

    );

}).catch( function( error ) {

    console.log( error );

});





// Retrieve algorithms
computationist.server.createEndpoint( 'get', '/algorithms/:algorithmName', function( request ) {
    return computationist.database.find( 'algorithms', { name : request.params.algorithmName } );
} );

// Upsert algorithms
computationist.server.createEndpoint( 'put', '/algorithms/:algorithmName', function( request ) {
    return computationist.format( 'algorithms', request.body ).then( function( entry ) {
        computationist.database.upsert( 'algorithms', { url : request.params.algorithmName }, entry );
    } ) ;
} ) ;

// Edit algorithms
computationist.server.createEndpoint( 'patch', '/algorithms/:algorithmName', function( request ) {
    return computationist.database.updateOne( 'algorithms', { url : request.params.algorithmName }, request.body );
} );

// Delete algorithms
computationist.server.createEndpoint( 'delete', '/algorithms/:algorithmName', function( request ) {
    return computationist.database.deleteOne( 'algorithms', { url : request.params.algorithmName } );
} );

