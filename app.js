'use strict';

const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const SSE = require('express-sse');

const app = express();
const server = require('http').createServer(app);

let rooms = {
};

app.use('/static', express.static('static'));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/views/server.html');
});

app.get('/viewer', function (req, res, next) {
    res.sendFile(__dirname + '/views/viewer.html');
});

app.post('/share', function (req, res, next) {
    let topic = uuidv4();
    let write = uuidv4();
    let sse = new SSE();
    rooms[topic] = { write, sse };
    res.json({ topic, write });
})

app.post('/share/:shareId/resource/:resId', bodyParser.text({ type: 'text/plain' }), async (req, res) => {
    if (rooms[req.params.shareId] != null &&
        req.headers.authorization == rooms[req.params.shareId].write) {
        fs.exists(__dirname + '/uploads/' + req.params.shareId + '-' + req.params.resId, (exists) => {
            if (!exists) {
                fs.writeFile(__dirname + '/uploads/' + req.params.shareId + '-' + req.params.resId, req.body, () => {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(200);
            }
        })
    } else {
        res.sendStatus(404);
    }
})

app.get('/share/:shareId/resource/:resId', async (req, res) => {
    if (rooms[req.params.shareId] != null) {
        fs.exists(__dirname + '/uploads/' + req.params.shareId + '-' + req.params.resId, (exists) => {
            if (!exists) {
                res.sendStatus(404);
            } else {
                fs.readFile(__dirname + '/uploads/' + req.params.shareId + '-' + req.params.resId, req.body, (err, data) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.send(data);
                    }
                })
            };
        })
    } else {
        res.sendStatus(404);
    }
});

app.post('/share/:shareId/update', bodyParser.text({ type: 'text/plain' }), (req, res) => {
    if (rooms[req.params.shareId] != null) {
        if (req.headers.authorization == rooms[req.params.shareId].write) {
            res.sendStatus(200);
            rooms[req.params.shareId].sse.send(req.body);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(404);
    }
});

app.get('/share/:shareId', (req, res, next) => {
    if (rooms[req.params.shareId] != null) {
        rooms[req.params.shareId].sse.init(req, res, next);
    }
});

server.listen(4200);

console.log("Server listening on localhost:4200");