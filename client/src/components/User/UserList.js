import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: []
    }
  }
  getAllUsers() {
    axios.get('http://localhost:3002/users')
      .then((response) => {
        this.setState({
          allUsers: response.data
        })
      })
  }
  componentDidMount() {
    this.getAllUsers();
  }
  render() {
    return (
      <div>
        <h1>List of Users</h1>
        <br />
        <ul>
          {this.state.allUsers.map((user) => {
            return <li key={user._id}>Name: {user.firstname}</li>
          })}
        </ul>
      </div>
    )
  }
}
