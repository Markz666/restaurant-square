import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateUserInfo, checkAuthenticated} from '../Auth/UserLoginInfo';
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
  	console.log("-------logout");
  	updateUserInfo({}, false);
  }

  render() {
  	if (!checkAuthenticated())
  		return <Redirect to="/login" />;

    return <div>Sorry to see you go...</div>;
  }
}

export default Logout;