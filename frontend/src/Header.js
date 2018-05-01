import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Nav, Navbar, NavItem, MenuItem } from "react-bootstrap";
import { checkAuthenticated } from './Auth/UserLoginInfo';
class Header extends Component {
  renderLinks() {
    if (checkAuthenticated()) {
      return (
        <Nav pullRight>
            <NavItem eventKey={1} href='login'>
              Logout
            </NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
            <NavItem eventKey={1} href='login'>
              Login
            </NavItem>
            <NavItem eventKey={2} href='signup'>
              Signup
            </NavItem>
        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Home</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="about">
              About
            </NavItem>
            <NavItem eventKey={2} href="display">
              Restaurant
            </NavItem>
          </Nav>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;