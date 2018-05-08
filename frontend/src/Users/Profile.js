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
        comments: ''
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
            comments: body.comments
        })
    }
    render() {
        if (!checkAuthenticated()) {
            window.location.href = "/login";
        }
        return (
            <div>
                <h1>This is the profile page</h1>
                <h3>UserName: {this.state.userName}</h3>
                <h3>Email: {this.state.email}</h3>
                <h3>Phone number: {this.state.phone}</h3>
                <h3>Comments: {this.state.comments}</h3>
                <h3 id="fav">Favorites: {this.state.favorites}</h3>           
            </div>                   
        )
    }
}
export default Profile;