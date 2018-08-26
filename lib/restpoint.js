
class Restpoint
{
	constructor( adipisici, configuration, response_function )
	{
		this.response_function = this.create_response( response_function );

		this.configuation = Object.assign( {}, Endpoint.default_settings, configuration );
	}

	go_live( )
	{

		if ( this.configuration.hasOwnProperty('http_method') && this.configuration.hasOwnProperty('extension') && this.configuration.hasOwnProperty('permissions') ) 
		{
			this.app [ restpoint.http_method ] ( restpoint.extension, restpoint.response_function );
		}
		else
		{
			console.log( "Restpoint missing required configuration parameter. At least http_method, extension, and permissions are required" );
		}

	}
	
	create_response( response_function ) 
	{

        var this_ = this;

        return (req, res) => {

        	var authenticated = this.is_public || this.adipisici_instance.check_privileges( request.params.username, request.params.password, this.configuration.permissions );

            if ( authenticated )
            {
                response_function( req ).then( ( data ) => {
                    res.send( data );
                }).catch( ( error ) => {
                    res.status(500).send( error );
                } );
            }

            else
            {
            	res.status(401).send( {
            		'error' : 401,
            		'message' : "Access denied"
            	} );
            }

            // Otherwise

                // res.send an http status indicating the failure to authenticate

        };
    }


} Restpoint.default_settings = {

	subdomain : '',

	track : true

};

module.exports = Restpoint;