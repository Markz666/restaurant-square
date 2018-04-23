import React, { Component } from "react";


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
        alert("You are going to login as: " + this.state.userName);
        event.preventDefault();
    }

    handleRegister() {

    }
    render() {
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