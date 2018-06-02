'use strict';

let phantomProxy = require('phantom-proxy');

let fs = require("fs");

/*

  arguments to pass

*/
let program = require('commander');


program
 .option('-f, --fontFamily', 'e.g `Roboto`')
  .option('-t, --text', 'text to render with fontFamily')
  .option('-w, --fontWeight', 'weight of the font face...')
  .option('-W', '--width', 'width of the div')
  .option('-o','--host','host to query')
 .parse(process.argv);



let { text, fontFamily, width, host} = program;



let query = `${host}:3000?text=${text}&fontFamily=${fontFamily}&width=${width}`;

phantomProxy.create({'debug': true}, function (proxy) {
    proxy.page.open(query,function (result) {

        proxy.page.waitForSelector('body', function (result) {

            proxy.page.render('scratch.png', function (result) {

            fs.writeFileSync('scratch.out.png',result, function(err){
                  if(err) {
                  return console.log('chill...' + err);
              }
            });

            proxy.end(function () {

                    console.log('done');
                });
            });
        }, 1000);
    });
});

