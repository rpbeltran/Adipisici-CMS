
const express     = require('express');
const body_parser = require('body-parser');


class Server {

	constructor ( settings )
	{
		this.settings = settings;

		this.restpoints = [ ];

		this.app = express();
        this.app.use( body_parser.json() );
	}

	start_listening ( )
	{
		return new Promise( ( resolve, reject ) => {
			
			this.app.listen( this.settings.port, resolve )
			.on('error', reject) );

		};
	}

	create_restpoint ( configuration, response_function )
	{
		var restpoint = new Restpoint ( this, configuration, response_function );

		restpoint.go_live();

		this.restpoints.push( restpoint );
	}


};

module.exports = Server;