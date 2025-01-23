const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log("New connection established.");

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});


server.listen(8080, () => {
    console.log("WebSocketserver running on port 8080");
})
