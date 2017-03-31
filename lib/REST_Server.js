
//
// REST Server
//

var express = require('express');
var body_parser= require('body-parser');

class REST_Server {

    constructor ( listening_port ) {

        this.port = listening_port || 3000;

        this.app = express();

        this.app.use( body_parser.json() );
    }

    startListening ( )
    // Initiate listening over endpoints on proper port
    {

        return this.app.listen( this.port, function ( ) {

            console.log( 'Adipisici REST server listening on ' + this.port );

        });

    }

    createEndpoint( http_method, extension, response_function )
    // Creates a new HTTP endpoint on the server
    {

        this.app[ http_method ]( extension, REST_Server.createResponse( response_function) );

    }

    static createResponse ( response_function ) {

        return function (req, res) {

            response_function( req ).then( function( data ) {

                res.send( data );

            }).catch( function( error ) {

                console.log( error );

                res.send( error );

            } );
        }

    }

}

module.exports = REST_Server;

