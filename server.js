var http = require('http');
var fs = require('fs');

var message = 'I am so happy to be part of the Node Girls workshop!';
var nodeMessage = 'Node! '
var girlsMessage = 'Node Girls! '

function handler (request, response) {
    var endpoint = request.url;
    if (endpoint === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile(__dirname + '/public/index.html', function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    }
    else if (endpoint === '/node') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(nodeMessage);
        response.write(message);
        response.end();
    }
    else if (endpoint === '/girls') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(girlsMessage);
        response.write(message);
        response.end();
    }
    else {
        if (endpoint.indexOf('css') > 0) {
            response.writeHead(200, {"Content-Type": "text/css"});
        }
        else if (endpoint.indexOf('jpg') > 0) {
            response.writeHead(200, {"Content-Type": "image/png"});
        }
        fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });    
   }
}
var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening on port 3000.  Ready to accept requests!")
});

