var page = require('webpage').create();
page.open('http://localhost:3000/?fontFace=Roboto&text=TEXTEEXX&width=200px&fontWeight=800', function () {

setTimeout(function(){
    page.render('google.png');
    phantom.exit();
    },1000);
});