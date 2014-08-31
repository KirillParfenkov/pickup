var MongoClient = require('mongodb').MongoClient,
    nconf = require('nconf');
nconf.argv().env().file({file: './config.json'});

module.exports = function() {

	return {

		conf : {
			host : nconf.get('db:host'),
			name : nconf.get('db:name'),
			port : nconf.get('db:port')
		},

		db : null,

		connect : function( finish ) {

			var conf = this.conf;
			var dao = this;

			MongoClient.connect('mongodb://' + conf.host + ':' +  conf.port + '/' + conf.name, function( err, db ) {
				//if (err) throw err;
				dao.db = db;
				finish( err );
			});
		},

		getById : function( id, finish ) {
			finish( null,
			{ 
				id: 1, 
				firstName: "Bob", 
				lastName: "Bobs", 
				profile : {
						id : 1,
						name : "Admin"
				}
			});
		},

		insert : function( user, finish ) {
			finish( user );
		},

		update : function( user, finish ) {
			finish( user );
		},

		delete : function( user, finish ) {
			finish();
		},

		getList : function( finish ) {
			var collection = this.db.collection('users');
			collection.find().toArray(function(err, results) {
				finish( err, results );	
			});
		},

		close : function() {
			dao.db.close();
		}
	}
}