import React, { Component } from 'react'
import { Navbar, Container, Section } from "react-bulma-components/full";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StartPage from './StartPage'
import Signup from './User/Signup'
import Login from './User/Login'

export default class Navigation extends Component {
  render() {
    return (
      <Router>

        <Navbar className="is-dark">
          <Container>
            <Navbar.Brand>
            <Link to="/">
              <Navbar.Item renderAs="a" href="/">
                <strong>ADVENTSHARE</strong>
              </Navbar.Item>
            </Link>
            </Navbar.Brand>
            <Navbar.Menu>
              <Navbar.Container>
                <Navbar.Item href="#">Home</Navbar.Item>
                <Navbar.Item href="#">Explore</Navbar.Item>
                <Navbar.Item href="#">Connect</Navbar.Item>
              </Navbar.Container>
              <Navbar.Container position="end">
                <Link to="/users/login">
                  <Navbar.Item>
                  <span className="button is-light">login</span>
                  </Navbar.Item>
                </Link>
                <Link to="/users/signup">
                  <Navbar.Item>
                    <span className="button is-primary">Sign Up</span>
                  </Navbar.Item>
                </Link>
              </Navbar.Container>
            </Navbar.Menu>
          </Container>
        </Navbar>
        <Section>
          <Container>
          <Route path="/" exact component={StartPage} />
          <Route path="/users/login" component={Login} />
          <Route path="/users/signup" component={Signup} />
          </Container>
        </Section>

      </Router>

    )
  }
}