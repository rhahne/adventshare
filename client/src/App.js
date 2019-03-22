import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import StartPage from './components/StartPage'
import { Signup, Login } from './components/general/UserComps'
import UserList from './components/user/UserList'
import Profile from './components/user/Profile'
import Logout from './components/user/Logout'
import ProtectedHome from './components/protected/Home'
import AreaOverview from './components/areas/Overview'
import AreaDetail from './components/areas/Detail'
import HousingDetail from './components/housings/Detail'
import Search, { SearchResponse } from './components/general/Search'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faBed, faLocationArrow, faInfo, faInfoCircle, faMountain, faEnvelope } from '@fortawesome/free-solid-svg-icons'
library.add(faStar, faBed, faLocationArrow, faInfo, faInfoCircle, faMountain, faEnvelope)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: '',
      signupModal: false,
      loginModal: false
    }
    this.loggingIn = this.loggingIn.bind(this)
    this.loggingOut = this.loggingOut.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/profile',
      withCredentials: true
    })
      .then((response) => {
        this.setState({
          isAuthenticated: true,
          user: response.data
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }
  
  loggingIn(event) {
    this.setState(() => ({
      isAuthenticated: true,
      user: event.data,
      loginModal: false,
      signupModal: false
    }))
  }

  loggingOut() {
    this.setState({
      isAuthenticated: false,
      user: ''
    })
  }

  toggleModal (element) {
    if(element === 'signup'){
      this.setState({
        signupModal: !this.state.signupModal
      })
    }else if(element === 'login'){
      this.setState({
        loginModal: !this.state.loginModal
      })
    }else if(element === 'both'){
      this.setState({
        signupModal: !this.state.signupModal,
        loginModal: !this.state.loginModal
      })
    }
  }

  render() {
    return (
      <div>
        <Navigation {...this.props} loggedIn={this.state.isAuthenticated} toggleModal={this.toggleModal} />
            <Switch>
              <Route path="/" exact component={StartPage} />
              <Route path="/users/logout" exact render={(props)=> <Logout {...props} loggingOut={this.loggingOut}/> }/>
              <Route path="/users/profile" exact render={(props)=> <Profile {...props} loggedIn={this.state.isAuthenticated}/> }/>
              <Route path="/users/signup" exact render={(props)=> <Signup {...props} loggingIn={this.loggingIn}/> }/>
              <Route path='/search/q' render={(props) => <SearchResponse {...props} query={props.location.state.query} /> } />
              <Route path="/users" exact component={UserList} />
              <Route path="/protected/index" exact component={ProtectedHome} />
              <Route path="/search" exact render={(props)=> <Search {...props}/>} />
              <Route path="/areas" exact component={AreaOverview} />
              <Route path="/areas/:areaId" component={AreaDetail}/>
              <Route path="/housings/:housingId" component={HousingDetail} />
            </Switch>
            {this.state.signupModal ? 
            <Signup loggingIn={this.loggingIn} toggleModal={this.toggleModal} />
            :''}
            {this.state.loginModal ? 
            <Login loggingIn={this.loggingIn} toggleModal={this.toggleModal} />
            :''}
      </div>  
    );
  }
}

export default App;