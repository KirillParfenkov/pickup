var MongoClient = require('mongodb').MongoClient,
	nconf = require('nconf'),
	ObjectID = require('mongodb').ObjectID;
nconf.argv().env().file({file: './config.json'});

module.exports = function() {

	var USER_TABLE = "users";

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
			var dao = this;
			var collection = this.db.collection( USER_TABLE );
			console.log( 'id: ' + id);
			collection.findOne({_id: new ObjectID( id )}, { "name" : 1, "phone" : 1, "desc": 1 }, function( err, user ) {
				finish( err, user );
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