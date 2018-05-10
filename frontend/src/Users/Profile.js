import React, { Component } from "react";
import { checkAuthenticated, getUserInfo } from '../Auth/UserLoginInfo';
class Profile extends Component {
    constructor(props) {
        super(props);
        document.title = "User Profile";
    }
    state = {
        userName: '',
        email: '',
        phone: '',
        favorites: '',
    }
    componentDidMount = async() => {
        const userToken = getUserInfo().token;
        // const userInfo = await fetch('/api/getUserProfile?token=' + userToken);
        const userInfo = await fetch('/api/getUserProfile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },            
            body: JSON.stringify({
                userToken: userToken,
            })
        })
        if (!userInfo) {
            return <h1>Cannot load the user's profile</h1>;
        }
        const body = await userInfo.json();
        console.log(body.favorites);
        let favorites = document.getElementById('fav');
        for (let i = 0; i < body.favorites.length; i++) {
            favorites.innerHTML += body.favorites[i];
        }
        this.setState({
            userName: body.userName,
            email: body.email,
            phone: body.phone,
            // favorites: body.favorites,
        })
    }
    render() {
        if (!checkAuthenticated()) {
            window.location.href = "/login";
        }
        return (
            <div>
                <h1>This is the <b>profile</b> page</h1>
                <br></br>
                <p className="profile">Username: {this.state.userName}</p>
                <p className="profile">Email: {this.state.email}</p>
                <p className="profile">Phone number: {this.state.phone}</p>
                <p className="profile" id="fav">Favorites:<br></br> {this.state.favorites}</p>           
            </div>                   
        )
    }
}
export default Profile;