const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bluebird = require("bluebird");
const fs = require('fs');
const im = require('imagemagick');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const session = require('express-session');
// const base64Img = require('base64-img');
const usersAPI = require("./db/users.js");


app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
    // const url = React.renderToString(<RestaurantPanel/>);
    // res.send(url);
  });

app.get('/api/getRestaurantInfo', (req, res) => {
    console.log("-------------/api/getRestaurantInfo-------------");
    let data = {"src":"popeyes", "title":"popeyes", "renqi":23, "pingfen":33, "favorite":30, "good":20, "bad":100, "category":"popeyes", "location":"popeyes", "introduction":"popeyes"};
    let str = JSON.stringify(data);
    console.log(str);
    res.send(str);
});

app.post('/api/login', async (req, res) => {
    console.log(req.body);
  
    const user = await usersAPI.getUserByUsername(req.body.userName);
    if (!user) {
        res.sendStatus(401);
    } else {
        const isMatch = await bcrypt.compare(req.body.password, user.hashed_password);
        if (!isMatch) {
            res.sendStatus(401);
        } else {
            res.send({status: 'login success'});
        }
    }
})

app.post('/api/signup', async (req, res) => {
    console.log(req.body);
    try {
        const saltRounds = 4;
        let hashed_password = await bcrypt.hash(req.body.password1, saltRounds);
        // console.log(hashed_password);
        await usersAPI.addUser(req.body.userName, hashed_password, req.body.email, req.body.phone);
        console.log("Create user success!");
        res.sendStatus(200);
    } catch (e) {
        const user = await usersAPI.getUserByUsername(req.body.userName);
        if (user) {
            res.sendStatus(400);
        }
    }
})

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

io.on('connection', socket => {
    console.log('User connected');
    socket.on('login', async(userInfo) => {
        console.log(userInfo);
        const user = await usersAPI.getUserByUsername(userInfo.userName);
        const isMatch = await bcrypt.compare(userInfo.password, user.hashed_password);
        let status = "Invalid username or password";
        if (!user || !isMatch) {
            socket.emit("login_err", status);
        } else {
            socket.emit("loggedIn", "success");
        }
    });

    socket.on("signup", async(userInfo) => {
        console.log(userInfo);
        try {
            const saltRounds = 4;
            let hashed_password = await bcrypt.hash(userInfo.password1, saltRounds);
            await usersAPI.addUser(userInfo.userName, hashed_password, userInfo.email, userInfo.phone);
            console.log("Create user success!");
            // res.render('body/private');
            let status = "success";
            socket.emit("loggedIn", status);
        } catch (e) {
            const user = await usersAPI.getUserByUsername(userInfo.userName);
            if (user) {
                status = "failed";
                socket.emit("signup_err", status);
            }
        }
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
});

http.listen(3001, function() {
    console.log('listening on :3001');
});
