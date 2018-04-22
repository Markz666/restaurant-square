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


class App extends Component {
  
  constructor(props) {
    super(props);
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
        <Grid>
          <Row>
            <div>
            <NavLink to={`/home`} className="nav-link">Home</NavLink>
            </div>
          </Row>
        </Grid>
          <div className="App-body">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="*" component={NotFound} />

              <Redirect from="/" to="/home"/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
