var express  =  require("express");
var bodyParser  =  require("body-parser");
var app  =  express();
let path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.set('views', path.join( __dirname, '/views') ); // critical to use path.join on windows
app.set('view engine', 'vash');

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})


app.get('/',function(req,res){
	
	console.log(JSON.stringify(req.query));
	
   res.render('index', {
      fontFamily: req.query.fontFamily
  });
});