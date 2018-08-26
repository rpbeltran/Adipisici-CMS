
const fs   = require('fs');
const path = require('path');

const Server = require( './server.js' );
const Database_Client = require( './database_client.js' );
const User_Manager = require( './user_manager.js' );

class Adipisici 
{


	// --- Constructor ---

	constructor ( settings )
	{
		this.settings = Object.assign( {}, Adipisici.default_settings, settings );

		this.secrets = JSON.parse( fs.readFileSync(path.join(__dirname, secret_path )) );

		this.database_client = new Database_Client   ( this.secrets.database );
		this.user_manager    = new User_Manager ( this.secrets.user_manager );
		this.server          = new Server ( { port : this.settings.port } );
	}


	// --- Start Listening ---

	start_listening ( )
	{
		this.server.start_listening();
	}


	// --- Endpoints ---

	create_restpoint ( configuration, response_function )
	{
		this.server.create_restpoint ( configuration, response_function );
	}

	// --- Authentication ---

	check_privileges ( enc_username, enc_password ) 
	{

	}


	// --- Admin Panel ---

	connect_admin_panel ( admin_url )
	{

	}

} Adipisici.default_settings = { 

	secret_path : 'secrets.json',

	port : 8080

}

module.exports = Adipisici;
