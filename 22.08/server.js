
const http = require('http');
var myLogModule = require('./log.js');
const fs=require("fs");

http.createServer(function (req, res) {

fs.readFile('index.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.write('Hello '+ myLogModule.Nume+' ' +myLogModule.Prenume );
    res.end();
    });
    
    
  }).listen(8080);