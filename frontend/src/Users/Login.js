import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from "react-router-dom";
import { updateUserInfo, checkAuthenticated } from '../Auth/UserLoginInfo';
import Notifications, {notify} from 'react-notify-toast';

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei',
    palette: {
        primary: 'purple',
      },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
        document.title = "Login Page";
    }

    handleLogin(event) {
        event.preventDefault();
        if (this.state.userName.length === 0) {
            notify.show('Username cannot be null', "error", 1800);
            return;
        }
        if (this.state.password.length === 0) {
            notify.show('Password cannot be empty', "error", 1600);
            return;
        }
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
            const status = String(response.status);
            const Login = this;

            if (status === '401') {
                this.setState({redirect: 'Invalid username or password'});
                updateUserInfo({}, false);

            } else {
                this.setState({redirect: 'success'});
                const func = response.json();

                func.then(function(result) {
                    updateUserInfo({token: result.retCode, username: Login.state.userName}, true);
                })
            }
        }) 
        .catch(error => {
            console.log(error);
        })

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
        this.setState({redirect: "register"});
    }
    render() {
        if (checkAuthenticated()) {
            window.location.href = "/searchPage";  
        }

        if (this.state.redirect === "register") {
            return <Redirect to="/signup" />;
        }
        if (this.state.redirect === "Invalid username or password") {
            return <Redirect to = "/login_err"/>;
        }
        if (this.state.redirect === "success") {
            window.location.href = "/searchPage";
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.root}>
                <Notifications />
                <img style={styles.icon} alt="login" src={require('../img/login.png')}/>
                <div className="form-group"> 
                    <label htmlFor="username" id="usernameLabel" className='myLabel'>Username </label>
                    <TextField
                        placeholder='Please enter username'
                        type='text'
                        id='username'
                        value={this.state.userName}
                        onChange={(event) => {this.setState({userName: event.target.value})}}/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="password" id="passwordLabel" className='myLabel'>Password </label>
                    <TextField
                        placeholder='Please enter password'
                        type='password'
                        id='password'
                        value={this.state.password}
                        onChange={(event) => {this.setState({password: event.target.value})}}/>
                </div>

                <div style={styles.buttons_container}>
                    <RaisedButton
                        label="Login" id="loginBtn" backgroudColor="#008394"
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
        top: 45,
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