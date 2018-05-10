import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { checkAuthenticated } from './Auth/UserLoginInfo';
class Header extends Component {
  renderLinks() {
    if (checkAuthenticated()) {
      return (
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">
              About
            </NavItem>
            <NavItem eventKey={2} href="/searchPage"> 
              Restaurant
            </NavItem>
            <NavItem eventKey={3} href="/profile">
              Profile
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href='/logout'>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>  
      )
    } else {
      return (
        <Navbar.Collapse className="nav_bar">
          <Nav>
            <NavItem eventKey={1} href="/about">
              About
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href='/login'>
              Login
            </NavItem>
            <NavItem eventKey={2} href='/signup'>
              Signup
            </NavItem>
          </Nav>
        </Navbar.Collapse>
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
        {this.renderLinks()}
      </Navbar>
    );
  }
}

export default Header;