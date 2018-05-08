import React, { Component } from 'react';
import { updateUserInfo, checkAuthenticated } from '../Auth/UserLoginInfo';

class Logout extends Component {
  componentWillMount() {
  	console.log("-------logout");
  	updateUserInfo({}, false);
  }

  render() {
  	if (!checkAuthenticated()) {
      window.location.href = "/login";
    }

    return <div>Sorry to see you go...</div>;
  }
}

export default Logout;