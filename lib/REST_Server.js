
//
// REST_Server.js
//


var express = require('express');
var body_parser= require('body-parser');


class Endpoint {

    constructor( server, http_method, extension, response_function, settings ) {

        // Configuration

        this.http_method = http_method;

        this.extension = extension;

        this.settings = Object.assign( {}, Endpoint.default_settings, settings );


        // Actions

        this.response_function = this.create_response( response_function );
        this.response_promise_function = this.create_response_promise( response_function );

        this.hooks = [];


        // Server

        this.server = server;

        this.server.app [ this.http_method ] ( this.extension, this.response_function );

    }


    add_hook( hook ) {
        this.hooks.push( hook );
    }

    bait_hooks ( req, res ) {
        ( _this => {
            this.hooks.forEach( ( hook ) => {
                hook( _this, req, res );
            });
        })(this);
    }

    create_response( response_function ) {

        var this_ = this;

        return (req, res) => {


            // if authenticated


                response_function( req ).then( ( data ) => {

                    res.send( data );

                }).catch( ( error ) => {

                    console.warn( error );

                    res.send( error );

                } );


            // Otherwise

                // res.send an http status indicating the failure to authenticate



        };
    }

    create_response_promise( response_function ) {

        var this_ = this;

        return ( req ) => {

            return new Promise((resolve, reject) => {

                // if authenticated

                    response_function(req).then((data) => {

                        resolve(data);

                    }).catch((error) => {

                        console.warn(error);

                        reject(error);

                    });

                // Otherwise

                    // reject with an http status indicating the failure to authenticate

            });

        }

    }

    trip( req ) {
        return this.response_promise_function( req );
    }

} Endpoint.default_settings = {

    authentication  : "none"

};










class REST_Server {

    constructor ( listening_port, settings = {} ) {

        this.settings = Object.assign( {}, REST_Server.default_settings, settings );

        this.app = express();
        this.app.use( body_parser.json() );

        this.endpoints = [];

    }

    startListening ( ) {

        return new Promise( (resolve) => this.app.listen( this.settings.port, resolve ) );

    }

    createEndpoint( http_method, extension, response_function, settings = {} ) {

        var endpoint = new Endpoint( this, http_method, extension, response_function, settings );

        this.endpoints.push( endpoint );

        return endpoint;

    }

} REST_Server.default_settings = {

    port : 3000

};







module.exports = REST_Server;

