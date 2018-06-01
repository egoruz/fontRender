var server=require('webserver').create();
var webpage=require('webpage');
var fs=require('fs');

var service=server.listen(8080,function(request,response){
  var queryIndex=request.url.indexOf("?");
  var params={};
  if(queryIndex>=0){
    var queries=request.url.substr(queryIndex+1).split('&');
    for(var i=0;i<queries.length;i++){
      try{
        var match=queries[i].match(/([^=]*)=(.*)/);
        params[match[1]]=decodeURIComponent(match[2]);
      }catch(e){}
    }
  }
  if(params.url&&params.selector){
    queue.push({response:response,url:params.url,selector:params.selector});
    consumeCapture();
  }else{
    response.statusCode=404;
    response.write('404 not found');
    response.close();
  }
});

var queue=[];
var NUM_PAGES=10;
var pages=NUM_PAGES;

function consumeCapture(){
  while(queue.length&&pages>0){
    pages--;
    capture(queue.shift());
  }
}

function capture(data){
  var page=webpage.create();
  console.log('start',data.url,data.selector);
  var originalRect={left:0,top:0,width:500,height:500};
  page.open("http://"+data.url,function(){
    console.log('onopen',data.url);
    var rect=page.evaluate(function(data){
      var element=document.querySelector(data.selector);
      if(element)return element.getClientRects()[0];
    },data);
    console.log('rect',JSON.stringify(rect));
    page.clipRect=rect||originalRect;
    data.response.statusCode=200;
    data.response.setHeader('Content-Type','image/png');
    data.response.setEncoding('binary');
    data.response.write(atob(page.renderBase64()));
    data.response.close();
    console.log('render done');
    page.release();
    pages++;
    consumeCapture();
  });
}