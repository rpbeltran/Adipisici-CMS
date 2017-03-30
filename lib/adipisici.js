

//
// Adipisici
//


REST_Server = require( './REST_Server' );
Data_Layer = require( './Data_Layer.js' );

class Adipisici {

    constructor ( name, mongo_url, listening_port )
    {
        this.name = name;
        this.server = new REST_Server( listening_port );
        this.data_layer = new Data_Layer( mongo_url );

        this.startListening();
    }


    // REST Layer

    startListening ( ) {
        return this.server.startListening( );
    }


    // Data Layer

    connect_database( ) { // Promise
        return this.data_layer.connect_database();
    }

    createDataForm( name, schema ) {
        this.data_layer.createDataForm( name, schema );
    }

    applyDataForm( form_name, data ) { // Promise
        return this.data_layer.applyDataForm( form_name, data );
    }

}

module.exports = Adipisici;
