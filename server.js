var express = require('express'),
	connect = require('connect'),
	nconf = require('nconf'),
	serveStatic = require('serve-static'),
	async = require('async'),
	bodyParser = require('body-parser'),
	path = require('path'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	UserDao = require('./modules/user-dao'),
	RoutDao = require('./modules/rout-dao');

// custom
var userDao = UserDao();
userDao.connect(function( err ) {
	//if (err) throw err;
	console.log( 'user dao started!' );
});

var routDao = RoutDao();
routDao.connect(function( err ) {
	//if (err) throw err;
	console.log( 'rout dao started!' );
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

app.get('/api/user/:id', function( req, res ) {
	userDao.getById( req.params.id, function( err, user ) {
		if (err) console.log( err );
		res.json( 200, 	user );
	});
});

app.get('/api/routs', function(req, res) {
	routDao.getList( function( err, routs) {
		res.json( 200, routs );
	});
});

app.get('/api/rout/:id', function(req, res) {
	routDao.getById( req.params.id, function( err, rout ) {
		res.json( 200, rout );
	});
});
