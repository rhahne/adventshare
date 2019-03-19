import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Section } from "react-bulma-components/full";
import Navigation from './components/Navigation'
import StartPage from './components/StartPage'
import Signup from './components/User/Signup'
import Login from './components/User/Login'
import UserList from './components/User/UserList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: ''
    }
    this.loggingIn = this.loggingIn.bind(this)
    this.loggingOut = this.loggingOut.bind(this)
  }
  loggingIn(event) {
    //Auth.login();
    this.setState(() => ({
      isAuthenticated: true,
      user: event.data
    }))
  }
  loggingOut() {
    //Auth.logout();
    this.setState({
      isAuthenticated: false,
      user: null
    })
  }
  render() {
    return (
      <div>
        <Navigation />
        <Section>
          <Container>
            <Switch>
              <Route path="/" exact component={StartPage} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/users/signup" exact component={Signup} />
              <Route path="/users" exact component={UserList} />
            </Switch>
          </Container>
        </Section>
      </div>
    );
  }
}


export default App;