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
import ActivityDetail from './components/activity/Detail'
import HousingDetail from './components/housings/Detail'
import { SearchResponse, SearchModal } from './components/general/Search'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faCalendarWeek, faBed, faLocationArrow, faInfo, faInfoCircle, faMountain, faEnvelope, faSearch, faCheckCircle, faHeart, faLink, faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faStar, faBed, faCalendarWeek, faLocationArrow, faInfo, faInfoCircle, faMountain, faEnvelope, faSearch, faCheckCircle, faHeart, faLink, faQuestionCircle, faTimesCircle)



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: '',
      signupModal: false,
      loginModal: false,
      searchModal: false
    }
    this.loggingIn = this.loggingIn.bind(this)
    this.loggingOut = this.loggingOut.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/users/profile`,
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
    this.getUserInfo();
    this.setState(() => ({
      loginModal: false,
      signupModal: false,
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
    }else if(element === 'search'){
      this.setState({
        searchModal: !this.state.searchModal
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
              <Route path="/users/account" exact render={(props)=> <Profile {...props} loggedIn={this.state.isAuthenticated}/> }/>
              <Route path="/users/signup" exact render={(props)=> <Signup {...props} loggingIn={this.loggingIn}/> }/>
              <Route path='/search/q' render={(props) => <SearchResponse {...props} query={props.location.state.query} toggleModal={this.toggleModal}/> } />
              <Route path="/users" exact component={UserList} />
              <Route path="/protected/index" exact component={ProtectedHome} />
              <Route path="/areas" exact component={AreaOverview} />
              <Route path="/areas/:areaId" component={AreaDetail}/>
              <Route path="/activities/:activityId" component={ActivityDetail} />
              <Route path="/housings/:housingId" render={(props) => <HousingDetail {...props} isAuthenticated={this.state.isAuthenticated} toggleModal={this.toggleModal} currentUserId={this.state.user} /> } />
            </Switch>

            {this.state.searchModal ? 
            <SearchModal toggleModal={this.toggleModal} />
            : '' }
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