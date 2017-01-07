/**
 * Created by ryanbeltran on 1/3/17.
 */

class data_form {

    constructor( name, default_format ) {
        this.name = name;

        // todo: set default values for field properties
        this.default_format = default_format;
    }

    format( entry ) {

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

            // All fields passed
            resolve( entry );

        });

    }

}


module.exports = data_form;





/* Example Usage

 Name:

    Algorithms

 Default_format:

     {
       // Longform

         'Name': {
             default: null,
             required: true,
             type: 'string'
             unique: true,
             private: false,
             immutable: false,
             validation: null,
             indexed: true
         },

         'popularity': {
             default: 0,
             required: true,
             type: 'integer'
             unique: false,
             private: true,
             immutable: false,
             validation: null,
             indexed: true
         },

       // Shortform

         'url': {
             required: true,
             type: string,
             unique: true,
             indexed: true
             validation: 'insert_regex_here'
         }

     }

 */