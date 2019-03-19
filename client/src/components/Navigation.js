import React, { Component } from 'react'
import { Navbar, Container } from "react-bulma-components/full";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar className="is-dark">
          <Container>
            <Navbar.Brand>
                <NavLink to="/" style={{ color: 'white' }}>
                  ADVENTSHARE
              </NavLink>
            </Navbar.Brand>
            <Navbar.Menu>
              <Navbar.Container>
                <Navbar.Item href="#">Home</Navbar.Item>
                <Navbar.Item href="#">Explore</Navbar.Item>
                <Navbar.Item href="#">Connect</Navbar.Item>
              </Navbar.Container>
              <Navbar.Container position="end">
                  <NavLink to="/users/login">
                    login
                  </NavLink>
                  <NavLink to="/users/signup">
                    Sign Up
                  </NavLink>
                  <NavLink to="/users/profile">
                    Profile
                  </NavLink>
                <Navbar.Item>
                  STATUS: {this.props.loggedIn ? 'fuck ya' : 'fuck no'}
                </Navbar.Item>
              </Navbar.Container>
            </Navbar.Menu>
          </Container>
        </Navbar>
      </div>
    )
  }
}