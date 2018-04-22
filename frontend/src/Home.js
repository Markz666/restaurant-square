import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import  Login  from './Users/Login';

class Home extends Component {
  render() {
    return (
      <Login/> 
    );
  }
}

export default Home;