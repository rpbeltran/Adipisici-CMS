
//
// Adipisici
//


REST_Server = require( './REST_Server.js' );
Data_Layer  = require( './Data_Layer.js'  );


class Adipisici {


    constructor ( name, settings = {} ) {

        this.name = name;
        this.settings = Object.assign( {}, Adipisici.default_settings, settings );

        this.server = new REST_Server( this.settings.port );

        this.mongo_url  = this.create_mongo_url();
        this.data_layer = new Data_Layer( this.mongo_url );
    }


    // REST Layer

    startListening ( ) {
        return this.server.startListening( );
    }


    // Data Layer

    create_mongo_url() {
        return 'mongodb://' + this.settings.mongo_domain + ':' + this.settings.mongo_port + '/' + [ ...this.name.toLowerCase() ].filter( c => c!=' ' ).join('');
    }

    connect_database( ) { // Promise
        return this.data_layer.connect_database();
    }

    createDataForm( name, schema ) {
        this.data_layer.createDataForm( name, schema );
    }

    applyDataForm( form_name, data ) { // Promise
        return this.data_layer.applyDataForm( form_name, data );
    }


} Adipisici.default_settings = {

    port : 3000,
    mongo_domain : 'localhost',
    mongo_port : 27017

};


module.exports = Adipisici;
