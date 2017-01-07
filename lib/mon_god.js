/**
 * Created by ryanbeltran on 12/29/16.
 */

var MongoClient = require('mongodb').MongoClient;

class MonGod {

    constructor ( connection_url )
    {
        this.connection_url = connection_url;
    }

    initiate_connection (  )
    // Connects to MongoDB database at connection_url
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            MongoClient.connect(this_instance.connection_url, function(err,db) {

                this_instance.database = db;

                if( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );

    }

    create_collection( collection, options )
    {
        var this_instance = this;

        return new Promise( function(resolve, reject) {

            this_instance.database.createCollection( collection, options, function( err, collection ) {

                if( err )
                    reject( err );
                else
                    resolve( collection );

            });
        } );
    }

    rename_collection( old_name, new_name )
    {
        //todo: make this a promise

        this.database.collection( old_name).rename( new_name );
    }

    delete_collection ( collection )
    {
        //todo: implement delete_collection
    }

    insert ( collection, document )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).insertOne( document, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    insertMany ( collection, documents )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).insertMany( documents, function(err) {

                if ( err  ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    update ( collection, document_rule, new_values )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).updateOne( document_rule, {$set: new_values}, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    updateMany ( collection, document_rule, new_values )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).updateMany( document_rule, {$set: new_values}, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    upsert( collection, document_rule, new_values )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).updateOne( document_rule, {$set: new_values}, { upsert: true }, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    delete ( collection, document_rule )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).deleteOne( document_rule, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    deleteMany ( collection, document_rule )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection( collection ).deleteMany( document_rule, function(err) {

                if ( err ) {
                    reject( err );
                } else {
                    resolve( );
                }

            } );

        } );
    }

    find( collection, query  )
    {
        var this_instance = this;

        return new Promise( function( resolve, reject ) {

            this_instance.database.collection(collection).find(query).toArray( function(err, documents) {

                if( err ) {
                    reject( err );
                } else  {
                    resolve( documents)
                }

            } );

        } );
    }

    allDocuments( collection )
    {
        return this.find( collection, { } );
    }

    createindex ( )
    {
        // todo: implement indexes
    }

}

module.exports = MonGod;
