
//
// Data Layer
//

class Data_Layer {


    constructor( mongo_url ) {
        this.database_url = mongo_url;
        this.data_schemes = {};
        this.data_models  = {};
    }


    // Manage Database

    connect_database( ) { // Promise
        this.mongoose = require( 'mongoose' );
        var this_instance = this;
        return new Promise( function ( resolve, reject ) {
            this_instance.mongoose.connect( this_instance.database_url );
            this_instance.database = this_instance.mongoose.connection;
            this_instance.database.on( 'open', resolve );
            this_instance.database.on( 'error', reject );
        } );
    }


    // Manage Data Forms

    createDataForm( name, schema ) { // Promise
        this.data_schemes[name] = this.mongoose.Schema( schema );
        this.data_models[name]  = this.mongoose.model( name, schema );
    }

    applyDataForm( form_name, data ) // Promise
    {
        return new this.data_models[form_name] ( data );
    }

    form( form_name ) {
        return this.data_models[form_name];
    }



    // CRUD Operations ( all promises )

    // Read

    find ( form, query ) {
        var this_instance = this;
        return new Promise( function( resolve, reject) {
            this_instance.form( form ).findOne( query, function ( err, object ) {
                if ( err )
                    reject( err );
                else
                    resolve( object );
            } );
        } );
    }

    findAll ( form, query ) {
        var this_instance = this;
        return new Promise( function( resolve, reject) {
            this_instance.form( form).find( query, function ( err, object ) {
                if ( err )
                    reject( err );
                else
                    resolve(object);
            } );
        } );
    }

    all ( form ) {
        return this.findAll( form, { } );
    }

    // Write

    insert ( form, data ) {
        //todo: acccept arrays for data
        var this_instance = this;
        return new Promise( function( resolve, reject ) {
            var obj = this_instance.applyDataForm( form, data );
            obj.save( function( err, obj_copy ) {
                if ( err )
                    reject( err );
                else
                    resolve( obj_copy );
            } );
        });
    }

    upsert ( form, index, data ) {
        //todo: acccept arrays for data
        var this_instance = this;
        return new Promise( function( resolve, reject ) {
            console.log( data );
            this_instance.form(form).findOneAndUpdate(index, data, { upsert:true }, function(err, obj) {
                if( err )
                    reject( err );
                else
                    resolve( obj );
            } );
        } );
    }

    update ( form, query, changes ) {
        //todo: acccept arrays for data
        var this_instance = this;
        return new Promise( function( resolve, reject ) {
            this_instance.form(form).findOneAndUpdate(query, changes, { upsert:false }, function(err, obj) {
                if( err )
                    reject( err );
                else
                    resolve( obj );
            } );
        } );
    }

    updateAll ( form, query, changes ) {
        //todo: implement this
    }

    delete ( form, query ) {
        var this_instance = this;
        return new Promise( function( resolve, reject ) {
            this_instance.form( form ).findOneAndRemove(query, function( err, obj ) {
                if( err )
                    reject( err );
                else
                    resolve( obj );
            } );
        } );
    }

    deleteAll ( form, query ) {
        //todo: implement this
    }


}

module.exports = Data_Layer;
