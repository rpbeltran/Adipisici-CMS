
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

        this.response_function = this.create_promise_response( response_function );

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


    create_promise_response( response_function ) {
        return ((this_) => {
            return (req, res) => {
                response_function(req).then((data) => {
                    res.send(data);
                }).catch((error) => {
                    console.log(error);
                    res.send(error);
                });
                this_.bait_hooks(req, res);
            };
        })(this);
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

        this.endpoints.push( new Endpoint( this, http_method, extension, response_function, settings ) );

    }

} REST_Server.default_settings = {

    port : 3000

};







module.exports = REST_Server;

