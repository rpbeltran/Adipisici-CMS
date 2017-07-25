

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

        this.adipisici.server.createEndpoint( 'post', '/__adipisici/admin_panel/object_properties', ( request ) => {
            return this_.object_properties( request );
        });

    }


    // ----- Setup -----


    connect_object ( name, attributes ) {

        if( ! attributes.hasOwnProperty('display_by') ) {
            attributes.display_by = 'id';
        }

        var skeleton = {
            name : name,
            template : this.adipisici.data_layer.data_templates[ attributes.data_form ],
            endpoints : Object.keys( attributes )
        };

        this.objects[name] = {
            data_form : attributes.data_form,
            endpoints : attributes.endpoints,
            skeleton: skeleton
        };

        this.object_skeletons.push( skeleton );

    }


    // ----- Commands -----


    get_info ( ) {
        var this_ = this;
        return new Promise( resolve => {
            resolve ( {
                name : this_.adipisici.name,
                https_enabled : false
            } );
        } );
    }

    list_objects ( ) {
        var this_ = this;
        return new Promise( resolve => {
            resolve ( this_.object_skeletons );
        } );
    }

    object_properties ( req ) {
        var this_ = this;
        return new Promise( ( resolve, reject) => {
            try {
                resolve(this_.objects[req.body.object].skeleton);
            }
            catch( err ) {
                reject( err );
            }
        } );

    }

    execute ( req ) {

        var this_ = this;

        return new Promise( ( resolve, reject) => {
            try {
                var params = Object.assign({}, req.body); // deep copies
                req.body = params;
                this_.objects[params.object].endpoints[params.endpoint].trip(req).then( response => {
                    resolve( response );
                } );
            }
            catch ( err ) {
                reject( err );
            }

        } );

    }

}

module.exports = Admin_Connect;