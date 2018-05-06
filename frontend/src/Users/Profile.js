import React, { Component } from "react";
import { updateUserInfo, checkAuthenticated, getUserInfo } from '../Auth/UserLoginInfo';
class Profile extends Component {
    constructor(props) {
        super(props);
        document.title = "User Profile";
    }
    state = {
        userInfo: ''
    }
    componentWillMount() {
        const user = getUserInfo();
        console.log(JSON.stringify(user));
        this.setState({
            userInfo: JSON.stringify(user)
        })
    }
    render() {
        if (!checkAuthenticated()) {
            window.location.href = "/login";
        }
        return (
            <div>
                <h1>This is the profile page</h1>
                <h4>{this.state.userInfo}</h4>
            </div>                   
        )
    }
}
export default Profile;