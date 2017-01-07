/**
 * Created by ryanbeltran on 1/3/17.
 */

var express = require('express');
var body_parser= require('body-parser');

class REST_Server {

    constructor ( listening_port ) {

        this.port = listening_port || 3000;

        this.app = express();

        this.app.use( body_parser.json() );
    }

    startListening ( ) {

        this.app.listen( this.port, function ( ) {

            console.log( 'Adipisici REST server listening on ' + this.port );

        });

    }

    createEndpoint( http_method, extension, response_function ) {

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

