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
    debugger
    event.preventDefault()
    let loginUser = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:3002/users/login',
      data: loginUser,
      withCredentials: true
    })
      .then((response) => {
        if(response.data){
          this.props.loggingIn(response);
        }
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
  render() {
    return (
      <div>
        <h2>Log in to de Account!</h2>
        <form  onSubmit={this.handleSubmit} action="http://localhost:3002/users/login">
          <input onChange={this.handleChange} type="text" name="firstname" placeholder="firstname" value={this.state.firstname} />
          <input onChange={this.handleChange} type="password" name="password" placeholder="password" value={this.state.password} />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
