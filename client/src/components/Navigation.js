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
                <NavLink className="navbar-item" to="/" style={{ color: 'white' }}>
                <img
                  src="./img/compass.svg"
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="112"
                  height="28"
                />
                </NavLink>
              </Navbar.Brand>

              <Navbar.Menu>
                <Navbar.Container>
                  <NavLink className="navbar-item" to="/" style={{ color: 'white' }}>
                  Home
                  </NavLink>

                  <NavLink className="navbar-item" to="/protected/index" style={{ color: 'white' }}>
                  Protected
                  </NavLink>

                  <NavLink className="navbar-item" to="/search" style={{ color: 'white' }}>
                  Search
                  </NavLink>
                </Navbar.Container>

              {this.props.loggedIn ?
                <Navbar.Container position="end">
                  <NavLink className="navbar-item" to="/users/profile">
                    <button className="button is-light">
                    Profile
                    </button>
                  </NavLink>

                  <NavLink className="navbar-item" to="/users/logout">
                    <span style={{ color: 'white' }}>
                    Logout
                    </span>
                  </NavLink>

                  <NavLink className="navbar-item" to="/search">
                    <button className="button is-light">
                    Search
                    </button>
                  </NavLink>
                </Navbar.Container>

                :

                <Navbar.Container position="end">

                    <NavLink className="navbar-item" to="/users/signup">
                      <button className="button is-primary">
                      Sign Up
                      </button>
                    </NavLink>

                    <NavLink className="navbar-item" to="/users/login">
                      <span style={{ color: 'white' }}>
                      Login
                      </span>
                    </NavLink>
                </Navbar.Container>
              }
            </Navbar.Menu>
          </Container>
        </Navbar>
      </div>
    )
  }
}