


class Data_Layer 
{

	constructor()
	{

		

	}



}








class Database_Client
{


	// ----------------------------- \\
	// - - - - - - - - - - - - - - - \\
	// - - - -  Constructor  - - - - \\
	// - - - - - - - - - - - - - - - \\
	// ----------------------------- \\

	constructor ( location, user )
	{
		this.location = location;
		this.user = user;

		this.queries = {};

	}



	// ------------------------- \\
	// - - - - - - - - - - - - - \\
	// - - - -  Connect  - - - - \\
	// - - - - - - - - - - - - - \\
	// ------------------------- \\

	connect ( )
	{
		this.client = new Database.maria_client ( {
  			host: this.location,
  			user:     this.user.database_username,
  			password: this.user.database_password
		} );
	}






	// ------------------------- \\
	// - - - - - - - - - - - - - \\
	// - - - -  Queries  - - - - \\
	// - - - - - - - - - - - - - \\ 
	// ------------------------- \\

	query_once ( query_string )
	{
		var this_ = this;
		return new Promise( ( resolve, reject ) => {
			this_.client.query( query_string , (err, data) => {
				err ? reject( err ) : resolve( data );
			});
		} );
	}


	// --- Cached Query

	build_cached_query ( name, querystring )
	{
		this.queries[name] = this.client.prepare( query_string );	
	}

	run_cached_query ( name, parameters )
	{
		var this_ = this;
		return new Promise(  ( resolve, reject ) => {
			this_.query( this_.queries[ name ]( parameters ), (err, data) => { 
				err ? reject( err ) : resolve( data ); 
			} );
		});
	}

	// --- Stream Queries

	stream_query ( querystring, row_handler )
	{
		var this_ = this;
		return new Promise( ( resolve, reject ) => {
			this_.client.query( querystring )
			.on( 'result', res => { 
				res.on( 'data', row_handler );
			})
			.on( 'end',  resolve )
			.on( 'error', reject );
		});
	}


	// --- Close Connection

	close ( )
	{
		this.client.end()
	}

} 


Database.maria_client = require('mariasql');

module.exports = Databse_Client
