/**
 * Created by ryanbeltran on 1/3/17.
 */

REST_Server = require( './REST_Server' );
MonGod = require( './mon_god' );
Data_Form = require( './data_form' );

class Adipisici {

    constructor ( name, mongo_url, listening_port ) {

        this.name = name;

        this.server = new REST_Server( listening_port );

        this.database = new MonGod( mongo_url );

        this.dataforms = { };

        this.server.startListening();

    }

    createDataForm( name, format ) {

        //todo: make this a promise

        this.dataforms[name] = new Data_Form( name, format );

        this.database.create_collection( name );

    }

    format( form_name, data ) {

        return this.dataforms[ form_name ].format( data ); //  A promise

    }

}

module.exports = Adipisici;