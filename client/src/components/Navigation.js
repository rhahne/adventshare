import React, { Component } from 'react'
import { Navbar, Container } from "react-bulma-components/full";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <>
        <Navbar className="is-dark">
          <Container>
            <Navbar.Brand>
              <Navbar.Item>
                <NavLink to="/" style={{color:'white'}}>
                  ADVENTSHARE
              </NavLink>
              </Navbar.Item>
            </Navbar.Brand>
            <Navbar.Menu>
              <Navbar.Container>
                <Navbar.Item href="#">Home</Navbar.Item>
                <Navbar.Item href="#">Explore</Navbar.Item>
                <Navbar.Item href="#">Connect</Navbar.Item>
              </Navbar.Container>
              <Navbar.Container position="end">
                <Navbar.Item>
                  <NavLink to="/users/login">
                    <span className="button is-light">login</span>
                  </NavLink>
                </Navbar.Item>
                <Navbar.Item>
                  <NavLink to="/users/signup">
                    <span className="button is-primary">Sign Up</span>
                  </NavLink>
                </Navbar.Item>
              </Navbar.Container>
            </Navbar.Menu>
          </Container>
        </Navbar>
      </>
    )
  }
}