

var http = require('http');


class Admin_Connect {

    constructor ( adipisici ) {

        this.adipisici = adipisici;

        this.objects = {};
        this.object_skeletons = [];

        var this_ = this;

        this.adipisici.server.createEndpoint( 'get', '/__adipisici/admin_panel/get_info', ( request ) => {
            return this_.get_info();
        });

        this.adipisici.server.createEndpoint( 'get', '/__adipisici/admin_panel/list_objects', ( request ) => {
            return this_.list_objects();
        });

        this.adipisici.server.createEndpoint( 'post', '/__adipisici/admin_panel/execute', ( request ) => {
            return this_.execute( request );
        });

    }


    // ----- Setup -----


    connect_object ( name, attributes ) {

        this.objects[name] = {
            data_form : attributes.data_form,
            endpoints : attributes.endpoints
        };

        this.object_skeletons.push({
            name : name,
            template : this.adipisici.data_layer.data_templates[ attributes.data_form ],
            endpoints : Object.keys( attributes )
        });

    }


    // ----- Commands -----


    get_info ( ) {
        var this_ = this;
        return new Promise( resolve => {
            resolve ( {
                name : this_.adipisici.name
                // database_url : this_.adipisici.data_layer.database_url
            } );
        } );
    }

    list_objects ( ) {
        var this_ = this;
        return new Promise( resolve => {
            resolve ( this.object_skeletons );
        } );
    }

    execute ( req ) {
        var this_ = this;
        return new Promise( resolve => {
            this_.objects[ req.body.name ].endpoints[ req.body.endpoint ].trip( req ).then( response => {
                resolve( response );
            });
        } );
    }

}

module.exports = Admin_Connect;