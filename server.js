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
    else {
       response.writeHead(200, {"Content-Type": "text/html"});
    if (endpoint == '/node') {
       response.write(nodeMessage);
    }
   if (endpoint == '/girls') {
       response.write(girlsMessage);
   }
   response.write(message);
   response.end();
   }
}
var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening on port 3000.  Ready to accept requests!")
});

