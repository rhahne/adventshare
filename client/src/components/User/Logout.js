import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount() {
    this.props.loggingOut();
    this.props.history.push('/')
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/users/logout`,
      withCredentials: true
    })
  }
  render() {
    return (
      <Redirect to="/" />
    )
  }
}
