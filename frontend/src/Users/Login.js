import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect, Link } from "react-router-dom";
import { error } from "util";
import {updateUserInfo, checkAuthenticated, getUserInfo} from '../Auth/UserLoginInfo'

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    handleLogin(event) {
        event.preventDefault();
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            })
        })
        .then((response) => {
            const status = response.status;

            if (status == '401') {
                this.setState({redirect: 'Invalid username or password'});
                updateUserInfo({}, false);
            } else {
                this.setState({redirect: 'success'});

                const func = response.json();
                func.then(function(result) {
                    updateUserInfo({token: result.retCode}, true);
                })
            }
        }) 
        .catch(error => {
            console.log(error);
        })

        // let userInfo = {
        //     userName: this.state.userName,
        //     password: this.state.password
        // };

        // socket.emit('login', userInfo);
        
        // socket.on('loggedIn', async(status) => {
        //     this.setState({redirect: status});
        // });
        // socket.on("login_err", async(status) => {
        //     this.setState({redirect: status});
        // });
    }

    handleRegister(event) {
        event.preventDefault();
        // axios.get("signup");
        this.setState({redirect: "register"});
    }
    render() {
        if (checkAuthenticated()) {
            //return <Redirect to="/display" />;
            window.location.href="/display";
        }

        if (this.state.redirect === "register") {
            return <Redirect to="/signup" />;
        }
        if (this.state.redirect === "Invalid username or password") {
            return <Redirect to = "/login_err"/>;
        }
        if (this.state.redirect === "success") {
            window.location.href="/display";//return <Redirect to="/display" />;
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.root}>
                <img style={styles.icon} src={require('../img/login.png')}/> 

                <TextField
                    hintText='Please enter username'
                    type='text'
                    value={this.state.userName}
                    onChange={(event) => {this.setState({userName: event.target.value})}}/>
                <TextField
                    hintText='Please enter password'
                    type='password'
                    value={this.state.password}
                    onChange={(event) => {this.setState({password: event.target.value})}}/>

                <div style={styles.buttons_container}>
                    <RaisedButton
                        label="Login" primary={true}
                        onClick={this.handleLogin.bind(this)}/>
                    <RaisedButton
                        label="Register" primary={false} style={{marginLeft: 60}}
                        onClick={this.handleRegister.bind(this)}/>
                </div>
            </div>
            </MuiThemeProvider>
        )
    }
}
const styles = {
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 40
    },
    buttons_container: {
        paddingTop: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
export default Login;