import React, { Component } from 'react'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      password: ''
    }
  }
  handleChange = (event) => {
    let updateInput = {}
    updateInput[event.target.name] = event.target.value;
    this.setState(updateInput);
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let loginUser = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:3002/users/login',
      data: loginUser,
      withCredentials: true
    })
      .then((response) => {
        if (response.data) {
          this.props.history.push('/users/profile')
          this.props.loggingIn(response);
        }
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
        <h2 className="title">Log in</h2>
        <form onSubmit={this.handleSubmit} action="http://localhost:3002/users/login">
          <div className="field">
            <label className="label">Firstname</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="text" name="firstname" placeholder="firstname" value={this.state.firstname} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="password" name="password" placeholder="password" value={this.state.password} />
            </div>
          </div>
          <div className="control">
            <input className="button is-link" type="submit" value="Login" />
          </div>
        </form>
        {this.state.errorMessage}
      </div>
    )
  }
}
