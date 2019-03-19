import React, { Component } from 'react'
import axios from 'axios'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstname: null
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
          firstname: response.data.firstname
        })
      })
      .catch((err) => {
        this.props.history.push('/users/login')
      })
  }
  render() {
    debugger
    return (
      <div>
        <h2>{this.props.loggedIn} </h2>
       {this.props.loggedIn?<h2>Welcome {this.state.firstname}</h2>:<h2>log in dude!</h2>} 
       
      </div>
    )
  }
}