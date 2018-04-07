const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bluebird = require("bluebird");
const fs = require('fs');
const im = require('imagemagick');
// var base64Img = require('base64-img');