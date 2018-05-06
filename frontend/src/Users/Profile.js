import React, { Component } from "react";
class Profile extends Component {
    constructor(props){
        super(props);
        document.title = "User Profile";
    }
    render() {
        return (
            <div>
                <h1>This is the profile page</h1>
            </div>                   
        )
    }
}
export default Profile;