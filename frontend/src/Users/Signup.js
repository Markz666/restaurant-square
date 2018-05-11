import React, { Component } from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateUserInfo, checkAuthenticated } from '../Auth/UserLoginInfo';
import Notifications, {notify} from 'react-notify-toast';

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
        document.title = "Signup Page";
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

        if (userName.length === 0 || password1.length === 0 || email.length === 0 || phone.length === 0) {
            notify.show('Please fill in all the info', "error", 1800);
        } else if (password1 !== password2) {
            notify.show('Please make sure two passwords are equal', "error", 1800);
        } else if (!this.validateEmail(email)) {
            notify.show('Please enter the correct email!', "error", 1800);
        } else if (phone.length < 10 || phone.length > 11) {
            notify.show('The phone number should be 10-11 digits.', "error", 1800);
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
                const status = String(response.status);
                // console.log(status);
                if (status === '400') {
                    this.setState({redirect: 'failed'});
                    updateUserInfo({}, false);
                } else {
                    this.setState({redirect: 'success'});

                    const func = response.json();
                    func.then(function(result) {
                        updateUserInfo({token: result.retCode, username:userName}, true);
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
    }

    render() {
        if (checkAuthenticated()) {
            window.location.href="/searchPage";
        }
        if (this.state.redirect === "success") {
            window.location.href="/searchPage";
        }
        if (this.state.redirect === "failed") {
            return <h1>User already exists! Please <a href="/login">Login</a></h1>;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.root}>
                <img style={styles.icon} alt='login' src={require('../img/login.png')}/> 
                <div className="form-group"> 
                    <label htmlFor="username" id='usernameLabel' className='myLabel'>Username </label>
                    <TextField
                        placeholder='Please enter username'
                        type='text'
                        id='username'
                        value={this.state.userName}
                        onChange={(event) => {this.setState({userName: event.target.value})}}/>
                </div>

                <div className="form-group"> 
                    <label htmlFor="password1" id="passwordLabel" className='myLabel'>Password </label>
                    <TextField
                        placeholder='Please enter password'
                        id='password1'
                        type='password'
                        value={this.state.password1}
                        onChange={(event) => {this.setState({password1: event.target.value})}}/>
                </div>

                <div className="form-group"> 
                    <label htmlFor="password2" id="passwordLabel" className='myLabel'>Password </label>
                    <TextField
                        placeholder='Please enter password again'
                        id='password2'
                        type='password'
                        value={this.state.password2}
                        onChange={(event) => {this.setState({password2: event.target.value})}}/>
                </div>

                <div className="form-group"> 
                    <label htmlFor="email" id="emailLabel" className='myLabel'>Email </label>
                    <TextField
                        placeholder='Please enter your email'
                        type='email'
                        id='email'
                        value={this.state.email}
                        onChange={(event) => {this.setState({email: event.target.value})}}/>
                </div>
                
                <div className="form-group"> 
                    <label htmlFor="phone" id="phoneLabel" className='myLabel'>Phone </label>
                    <TextField
                        placeholder='Please enter your phone number'
                        type='text'
                        id='phone'
                        value={this.state.phone}
                        onChange={(event) => {this.setState({phone: event.target.value})}}/>
                </div>
                
                <Notifications options={{zIndex: 5000}}/>    

                <div style={styles.buttons_container}>
                    <RaisedButton
                        label="Signup"
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
export default Signup;