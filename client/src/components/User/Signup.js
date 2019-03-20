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
          this.props.loggingIn(response);
          this.props.history.push('/users/profile')
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.message,
        })
      })
  }
  
  render() {
    return (
      <div>
        <h1 className="title">Sign Up</h1>
        <form onSubmit={this.handleSubmit} action="http://localhost:3002/users">
          <div className="field">
            <label className="label">
            Firstname
            </label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="text" name="firstname" placeholder="firstname" value={this.state.firstname} />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="email" name="email" placeholder="email" value={this.state.email} />
            </div>
          </div>
          <div className="field">
            <label className="label">Bio</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="text" name="bio" placeholder="bio" value={this.state.bio} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="password" name="password" placeholder="password" value={this.state.password} />
            </div>
          </div>
          <div className="control">
            <input className="button is-link" type="submit" value="Sign Up" />
          </div>
        </form>
        {this.state.errorMessage}
      </div>
    )
  }
}