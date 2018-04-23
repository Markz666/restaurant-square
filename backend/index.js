const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bluebird = require("bluebird");
const fs = require('fs');
const im = require('imagemagick');
// const base64Img = require('base64-img');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

http.listen(3001, function() {
    console.log('listening on :3001');
});
