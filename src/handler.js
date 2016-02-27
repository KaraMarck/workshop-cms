var fs = require('fs');
var querystring = require('querystring');

var message = 'I am so happy to be part of the Node Girls workshop!';
var nodeMessage = 'Node! '
var girlsMessage = 'Node Girls! '

function handler (request, response) {
    var endpoint = request.url;
    if (endpoint === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile('./assets/index.html', function(error, file) {
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
    else if (endpoint === '/create-post') {
        var allTheData = '';
        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });

        request.on('end', function () {
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
             response.writeHead(302, {"Location": '/'});
            response.end();
        });
    }
    else {
        if (endpoint.indexOf('css') > 0) {
            response.writeHead(200, {"Content-Type": "text/css"});
        }
        else if (endpoint.indexOf('jpg') > 0) {
            response.writeHead(200, {"Content-Type": "image/png"});
        }
        fs.readFile('./assets' + endpoint, function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });    
   }
}

module.exports = handler; 
