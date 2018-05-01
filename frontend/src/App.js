import React, { Component } from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import { Grid, Row, Nav, Navbar, NavItem } from "react-bootstrap";
import Home from "./Home";
import NotFound from "./NotFound";
import Signup from './Users/Signup';
import Login from './Users/Login';
import Logout from './Users/Logout';
import Login_Error from './Users/Login_err';
import RestaurantPanel from './Display/RestaurantPanel';
import Header from './Header';

class App extends Component {
  
  constructor(props) {
    super(props);
  }
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi().then(res => this.setState({response: res.express}))
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div>
      <Header />
      <Router>
        <div className="App">
        {/* <p className="App-intro">{this.state.response}</p> */}
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
               <Route path="/logout" component={Logout}/>
              <Route path="/login_err" component={Login_Error}/>
              <Route path="/display" component={RestaurantPanel}/>
              <Route path="*" component={NotFound} />
              
            </Switch>
          </div>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
