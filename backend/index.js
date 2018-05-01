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
const token = require("./Auth/token.js");
var request = require('request');

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

app.get('/api/getRestaurantsList', (req, res) => {
    console.log("----------------------getRestaurantsList----------------------");
    var base_url = 'https://api.yelp.com/v3/businesses/search';
    var authOptions = {
      url: base_url + '?latitude=' + req.query.lat + "&longitude=" + req.query.lng,
      headers: {
        'Authorization': "Bearer 7tqgwNq05Ewf75JbrdOwtEqF5p1TvkM2-szTe4rTHmDTEu5MXmdImw84wdejue3AAlxl5ku_wQheVB7_EkSnmafVmqJHtC-bzp_-DWHSyDJzUsI7EsZw8oFcpuzWWXYx",
      },
      grant_type: 'client_credentials',
      json: true
    };

    request.get(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
        else
            res.send({retCode:400, message:'invalid parameters'});
    });
});

app.post('/api/login', async (req, res) => {
    const user = await usersAPI.getUserByUsername(req.body.userName);
    console.log("/api/login");
    if (!user) {
        console.log("/api/login no user");
        res.sendStatus(401);
    } else {
        const isMatch = await bcrypt.compare(req.body.password, user.hashed_password);
        if (!isMatch) {
            console.log("/api/login no match");
            res.sendStatus(401);
        } else {
            console.log("/api/login match");
            let tokenCode = token.createToken(req.body);
            res.send({status: 'login success', retCode: tokenCode});
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
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
});

http.listen(3001, function() {
    console.log('listening on :3001');
});
