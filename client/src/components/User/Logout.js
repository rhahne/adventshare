import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount() {
    this.props.loggingOut();
    this.props.history.push('/users')
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/logout',
      withCredentials: true
    })
  }
  render() {
    return (
      <Redirect to="/users" />
    )
  }
}
