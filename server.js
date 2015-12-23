/*
 * Module Dependencies
 */
var express = require('express');
var app = express();
var routes = require('./routes');
var path = require('path');
var http = require('http').createServer(app);

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration



	app.configure(function() {
		app.set('port', process.env.PORT || 8080);
		//app.set('views', __dirname + "/views");
		app.set('view engine', 'ejs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
		// required for passport
 	        app.use(express.session({ secret: '＊' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	});


	app.configure('development', function() {
		app.use(express.errorHandler());
	});

	http.listen(app.get('port'), function() {
		console.log("Express server listening on port #" + app.get('port'));
	});

	app.get('/', routes.index);
	app.get('/login', routes.login);
	app.get('/signup', routes.signup);
	app.get('/range', routes.range);
	app.get('/file', routes.file);
	app.get('/destination', routes.destination, function(req, res) {
        res.send('user: ' + req.params.username);
   });
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);










