var page = require('webpage').create();
page.open('woff.html', function() {
  page.render('woff.png');
  phantom.exit();
});