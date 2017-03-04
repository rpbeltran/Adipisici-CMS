
//
// Data Forms
//

//todo: checkout mongoose and see if it could be used here

class data_form {

    constructor( name, default_format ) {

        this.name = name;

        // todo: set default values for field properties

        this.default_format = default_format;

    }

    format( entry )
    // Applies data model to a JSON Entry
    {

        // todo: Shift a lot of this functionality onto mongo using document verification

        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            for ( var key in this_instance.default_format ) {

                if ( this_instance.default_format.hasOwnProperty(key) ) {

                    let field = this_instance.default_format[key];

                    // Set default if necessary
                    if ( field.hasOwnProperty( 'default' ) && ! entry.hasOwnProperty( key ) ) {
                        entry[key] = field.default;
                    }

                    // Check that field exists if required
                    else if( field.required && ! entry.hasOwnProperty( key ) ) {
                        console.log( entry );
                        reject( this_instance.name + "entry is missing required field: " + key );
                        return;
                    }

                    // Check that field is unique if required
                    if( field.unique ) {
                        //todo: check that field is unique
                    }

                    // Validate field against REGEX if required
                    if( field.validation ) {
                        //todo: implement regex validation
                    }

                }

            }

            entry.created = new Date();
            entry.updated = entry.created;

            // All fields passed
            resolve( entry );

        });

    }

}


module.exports = data_form;