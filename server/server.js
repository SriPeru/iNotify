const express = require('express');
let app = express();
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const compress = require('compression');
const url = require('url');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
let port = process.env.PORT || 7070;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());                // enable ALL CORS requests
encoding = 'utf8';

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let jsondata, start;
       

wss.on('connection', function connection(ws) {
    start = Date.now();
    json = fs.readFileSync('./server/data/messages.json', 'utf8');
          ws.on('message', function incoming(message) {
            console.log('received: %s', message);
          });
    
    ws.send(json);
});

// Every three seconds broadcast "{ message: 'Hello hello!' }" to all connected clients
let broadcast = function(i) {
let int = setInterval(function(){
  // wss.clients is an array of all connected clients
  wss.clients.forEach(function each(client) {
      let pushjson = '{'+
                                '"msgType": 1,'+
                                '"content": "Srini Perumal Checking the push state - '+ i+'",'+
                                '"timeStamp": "'+ new Date().toISOString() +'",'+
                                '"action" : "View Task &gt;",'+
                                '"action_href": "#"'+
                              '}';
            client.send(pushjson);
            console.log('Sent: ' + pushjson);
            i-- || clearInterval(int);
    
        });
    }, 3000);
}


broadcast(6);

server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});