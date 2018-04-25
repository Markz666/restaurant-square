import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";

const socket = io('http://localhost:3001');

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
        let userInfo = {
            userName: this.state.userName,
            password: this.state.password
        };
        socket.emit('login', userInfo);
    }

    handleRegister(event) {
        event.preventDefault();
        // axios.get("signup");
        this.setState({redirect: true});
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/signup" />;
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.root}>
                <img style={styles.icon} src={require('../img/login.png')}/> 

                <TextField
                    hintText='Please enter username'
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