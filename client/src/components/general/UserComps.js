import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Signup extends Component {
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
      <>
          <div className="modal ">
            <div className="modal-background"></div>
            <div className="modal-card">
              <p className="modal-card-title">Sign Up!</p>
              <button className="delete" aria-label="close"></button>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create an Account!</p>
                <button onClick={this.props.closeSignupModal} className="delete" aria-label="close"></button>
              </header>   
              <section className="modal-card-body">
                <form onSubmit={this.handleSubmit} action="http://localhost:3002/users">
                  <div className="field">
                    <label className="label">E-Mail Address</label>
                    <div className="control">
                      <input className="input" onChange={this.handleChange} type="email" name="email" placeholder="email" value={this.state.email} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">
                      Firstname
            </label>
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
                  <div className="field">
                    <label className="label">Bio</label>
                    <div className="control">
                      <textarea className="textarea" onChange={this.handleChange} name="bio" placeholder="Tell us about yourself!" value={this.state.bio}></textarea>
                    </div>
                  </div>
                  <div className="control">
                    <input className="button is-link" type="submit" value="Sign Up" />
                  </div>
                </form>
                <small>Already have an account? <Link to="/users/login">Login</Link></small>
                {this.state.errorMessage}
              </section>
            </div>
          </div>
          </>
    )
  }
}
