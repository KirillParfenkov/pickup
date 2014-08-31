var express = require('express'),
	connect = require('connect'),
	nconf = require('nconf'),
	serveStatic = require('serve-static'),
	async = require('async'),
	bodyParser = require('body-parser'),
	path = require('path');
	UserDao = require('./modules/user-dao');

// custom
var userDao = UserDao();
userDao.connect(function( err ) {
	if (err) throw err;
	console.log( 'mongoDB started!' );
});

var app = express();

nconf.argv().env().file({file: './config.json'});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use( serveStatic('public') );
app.get('/api', function(req, res) {
	res.send(200, 'Api is runnig!');
});

app.listen(nconf.get('port'), function() {
	console.log('Server running at ' + nconf.get('port') + ' port');
});

app.get('/api/users', function( req, res ) {
	userDao.getList( function( err, users ) {
		res.json( 200, 	users );
	});
});