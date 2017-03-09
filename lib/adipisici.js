

//
// Adipisici
//


REST_Server = require( './REST_Server' );
MonGod      = require( './mon_god' );
Data_Form   = require( './data_form' );


class Adipisici {

    constructor ( name, mongo_url, listening_port )

    // pre-conditions:
    //  * string name        = name of application ( exp. "My Website )
    //  * string mongo_url   = URL for MongoDB instance ( exp. "mongodb://localhost:27017/my_website" )
    //  * int listening_port = port for backend to listen over ( exp. 8080 )

    // post-conditions:
    //  * Adipisici instance is initialized with supplied parameters
    //  * Backend server is listening over designated port

    {
        this.name = name;

        this.server = new REST_Server( listening_port );

        this.database = new MonGod( mongo_url );

        this.dataforms = { };

        this.server.startListening( );
    }



    createDataForm( name, format )

    // Creates a new data form object and adds a collection for it to the database

    // pre-conditions:
    //  * string name = name of data form ( exp. "blog_post" )
    //  * JSON format = data fields and options for data form

    // post-conditions:
    //  * new data_form is stored
    //  * database has an empty collection for new data form objects

    {
        //todo: make this a promise

        this.dataforms[name] = new Data_Form( name, format );

        this.database.create_collection( name );
    }



    format( form_name, data ) // PROMISE
    // an alias for data_form.format( data ) using the data_form named form_name
    {
        return this.dataforms[ form_name ].format( data );
    }


}

module.exports = Adipisici;