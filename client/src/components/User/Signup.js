import React, { Component } from 'react'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default class Signup extends Component {
  state = {
    firstname: '',
    email: '',
    bio: '',
    password: ''
  }
  handleChange = (event) => {
    let updateInput = {}
    updateInput[event.target.name] = event.target.value;
    this.setState(updateInput);
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let newUser = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:3002/users',
      data: newUser,
      withCredentials: true
    })
      .then((response) => {
        this.props.history.push('/')
        console.log('success')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        <h1 className="title">Sign Up</h1>
        <form onSubmit={this.handleSubmit} action="localhost:3002/users">
          <div class="field">
            <label class="label">Firstname</label>
            <div class="control">
              <input className="input" onChange={this.handleChange} type="text" name="firstname" placeholder="firstname" value={this.state.firstname} />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input className="input" onChange={this.handleChange} type="email" name="email" placeholder="email" value={this.state.email} />
            </div>
          </div>
          <div class="field">
            <label class="label">Bio</label>
            <div class="control">
              <input className="input" onChange={this.handleChange} type="text" name="bio" placeholder="bio" value={this.state.bio} />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input className="input" onChange={this.handleChange} type="password" name="password" placeholder="password" value={this.state.password} />
            </div>
          </div>
          <div class="control">
            <input className="button is-link" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    )
  }
}