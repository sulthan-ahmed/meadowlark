var https = require('https');
    express = require('express');


var app = express();

var credentials = require('./credentials.js')

//in Express, the order in which routes and middleware are added is significant
//set up handlebars as our template engine (i.e. view engine)
//specified default layout as main. This is the layout for any view
var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var fortunes = [
    "Don't cry because it's over, smile because it happened.",
    "Be yourself; everyone else is already taken.",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "Be the change that you wish to see in the world.",
    "If you tell the truth, you don't have to remember anything."
];

//In many environments (e.g. Heroku), and as a convention, you can set the environment
// variable PORT to tell your web server what port to listen on.
//process.env.port || 3000 means: whatever is in the environment variable PORT,
// or 3000 if there's nothing there.
app.set('port', process.env.PORT || 3000);

// middleware are function(s) run between the client request and the server answer.
//To serve static files such as images, CSS files, and JavaScript files
//use the express.static built-in middleware
//_dirname is use to refer to the location of this module's path
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    console.log("first middle ware");
    next();
});

//app. get is a method that takes two parameters: a path and a function.
//by default the content type will be html
app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    //floor() rounds down and random() makes a random value between 0 and 1
    var randomFortune =
            fortunes[Math.floor(Math.random() * fortunes.length)];
    //here we are passing our var randomFortune as fortune to the html
    //this can then be used in the html
    res.render('about', { fortune: randomFortune});
});

// Express adds middleware when you use app.use
// i.e. catch-all handler for anything that didn’t get matched by a route
// custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});