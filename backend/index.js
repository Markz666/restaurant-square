const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bluebird = require("bluebird");
const fs = require('fs');
const im = require('imagemagick');
// const base64Img = require('base64-img');
const usersAPI = require("./db/users.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// require('socketio-auth')(io, {
// authenticate: function (socket, data, callback) {
//     //get credentials sent by the client 
//     const username = data.username;
//     const password = data.password;

//     usersAPI.getUserByUsername('User', {username:username}, function(err, user) {

//     //inform the callback of auth success/failure 
//     if (err || !user) return callback(new Error("User not found"));
//     return callback(null, user.password == password);
//     });
// }
// });

app.get("/api/users", (req, res) => {
    res.sendStatus(200);
})

io.on('connection', socket => {
    console.log('User connected');
    socket.on('login', async(userInfo) => {
        console.log(userInfo);
    });

    socket.on("signup", async(userInfo) => {
        console.log(userInfo);
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
});

http.listen(3001, function() {
    console.log('listening on :3001');
});
