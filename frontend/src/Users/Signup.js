import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {updateUserInfo, checkAuthenticated, getUserInfo} from '../Auth/UserLoginInfo'

import { Redirect } from "react-router-dom";

let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password1: "",
            password2: "",
            email: "",
            phone: ""
        };
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSignup(event) {
        event.preventDefault();
        // axios.post("api/users", {user: this.state});
        const userName = this.state.userName;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        const email = this.state.email;
        const phone = this.state.phone;

        // let userInfo = {
        //     userName: userName,
        //     password1: password1,
        //     password2: password2,
        //     email: email,
        //     phone: phone
        // };
        if (userName.length === 0 || password1.length === 0 || email.length === 0 || phone.length === 0) {
            alert("Please fill in all the info");
        } else if (password1 !== password2) {
            alert("Please make sure two passwords are equal");
        } else if (!this.validateEmail(email)) {
            alert("Please enter the correct email!");
        } else if (phone.length < 10 || phone.length > 11) {
            alert("The phone number should be 10-11 digits.")
        } else {
            fetch('api/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: userName,
                    password1: password1,
                    password2: password2,
                    email: email,
                    phone: phone
                })
            })
            .then((response) => {
                const status = response.status;
                console.log(status);
                if (status === '400') {
                    this.setState({redirect: 'failed'});
                    updateUserInfo({}, false);
                } else {
                    this.setState({redirect: 'success'});

                    var func = response.json();
                    func.then(function(result){
                        updateUserInfo({token:result.retCode}, true);
                    })
                }
            }) 
            .catch(error => {
                console.log(error);
            })
        }
        // socket.on('loggedIn', async(status) => {
        //     this.setState({redirect: status});
        // });
        // socket.on('signup_err', async(status) => {
        //     this.setState({redirect: status});
        // });

    }

    render() {
        if (checkAuthenticated())
        {
            return <Redirect to = "/" />;
        }

        if (this.state.redirect === "success") {
            return <Redirect to="/" />;
        }
        if (this.state.redirect === "failed") {
            return <Redirect to="/404" />;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.root}>
                <img style={styles.icon} alt='login' src={require('../img/login.png')}/> 

                <TextField
                    hintText='Please enter username'
                    type='text'
                    value={this.state.userName}
                    onChange={(event) => {this.setState({userName: event.target.value})}}/>
                <TextField
                    hintText='Please enter password'
                    type='password'
                    value={this.state.password1}
                    onChange={(event) => {this.setState({password1: event.target.value})}}/>
                <TextField
                    hintText='Please enter password again'
                    type='password'
                    value={this.state.password2}
                    onChange={(event) => {this.setState({password2: event.target.value})}}/>
                <TextField
                    hintText='Please enter your email'
                    type='email'
                    value={this.state.email}
                    onChange={(event) => {this.setState({email: event.target.value})}}/>
                <TextField
                    hintText='Please enter your phone number'
                    type='text'
                    value={this.state.phone}
                    onChange={(event) => {this.setState({phone: event.target.value})}}/>    

                <div style={styles.buttons_container}>
                    <RaisedButton
                        label="Signup" primary={true}
                        onClick={this.handleSignup.bind(this)}/>
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
export default Signup;