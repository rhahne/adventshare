import React, { Component } from 'react'
import axios from 'axios'
import { Label } from 'react-bulma-components/full';
import Login from './Login';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData: null
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/profile',
      withCredentials: true
    })
      .then((response) => {
        this.setState({
          userData: response.data
        })
      })
      .catch((err) => {
        this.props.history.push('/users/login')
      })
  }
  render() {
    return (
      <div>
        {this.state.userData?
        <>
          <h1 className="title">Welcome {this.state.userData.firstname}</h1>
          <ul>
            <li>Firstname: {this.state.userData.firstname}</li>
            <li>Email: {this.state.userData.email}</li>
            <li>Bio: {this.state.userData.bio}</li>
          </ul>
        </>
        :
        <h2>log in dude!</h2>}
      </div>
    )
  }
}