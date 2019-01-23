const http = require('http');
const url =  require('url');

// provide the hostname and port in which the server needs to be run
const hostname = '127.0.0.1';
const port = 2345;

// handler function
function handleRequests(req,res){
	
   // parse the request url to get the path 	
   var parsedUrl = url.parse(req.url,true);
   var path = parsedUrl.pathname;
   var trimmedPath = path.replace(/^\/+|\/+$/g,''); 
   
   //determine the handler function to be called based on the url path
   var chosenHandler;
   chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : handlers.notFound;   
  
   chosenHandler(path,function(statusCode, respData){
	    var response = respData || {};
	    res.setHeader('Content-Type','application/json');
		res.writeHead(statusCode);
		res.end(JSON.stringify(response));
   });
  
}

// Create the http server and pass the handler function as callback fn.
const server = http.createServer(handleRequests);

// Make the server listen to the configured hostname and port
server.listen(port,hostname,function(req,res){
  console.log(`The server is running at http://${hostname}:${port}/`);
});


// define Handlers.
const handlers = {};
handlers.hello = function(data,cb){
   var response =  {'message' : 'Welcome to Nodejs HelloWorld !!'}
   cb(200,response);
};

handlers.notFound = function(data,cb){
	cb(404);
};

//Define various routes
var routes = {
	'hello' : handlers.hello
}