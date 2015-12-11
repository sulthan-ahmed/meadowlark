var express = require('express');
var app = express();

//In many environments (e.g. Heroku), and as a convention, you can set the environment
// variable PORT to tell your web server what port to listen on.
//process.env.port || 3000 means: whatever is in the environment variable PORT,
// or 3000 if there's nothing there.
app.set('port', process.env.PORT || 3000);

// custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404- Not Found');
});

//custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate')
});

