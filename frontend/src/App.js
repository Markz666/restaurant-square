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
import RestaurantPanel from './Display/RestaurantPanel';

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
      <Router>
        <div className="App">
        <header>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
              <a href="/"><img src='https://cdn.vectorstock.com/i/1000x1000/09/91/hat-chef-logo-vector-19810991.jpg'  alt="logo" height='20px'/></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Navbar>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <Grid>
          <Row>
            <div>
            <NavLink to={`/`} className="nav-link">Home</NavLink>
            </div>
          </Row>
        </Grid>
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/display" component={RestaurantPanel}/>
              <Route path="*" component={NotFound} />
              
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
