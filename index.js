'use strict';

let phantomProxy = require('phantom-proxy');


/*

  arguments to pass 

*/
var program = require('commander');


program
 .option('-f, --fontFamily', 'e.g `Roboto`')
  .option('-t, --text', 'text to render with fontFamily')
  .option('-w, --fontWeight', 'weight of the font face...')
  .option('-W', '--width', 'width of the div') 
 .parse(process.argv);


let { text, fontFamily, width} = program;
let query = `localhost/textRender/?text=${text}&fontFamily=${fontFamily}&width=${width}`;

phantomProxy.create({'debug': true}, function (proxy) {
    proxy.page.open(query,
     function (result) {
        assert.equal(result, true);
        proxy.page.waitForSelector('body', function (result) {
            assert.equal(result, true);
            proxy.page.render('./scratch/scratch.png', function (result) {
                assert.equal(result, true);
                proxy.end(function () {
                    console.log('done');
                });
            });
        }, 1000);
    });
});
