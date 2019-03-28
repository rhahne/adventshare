import React, { Component } from 'react'
import axios from 'axios'

export class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      email: '',
      bio: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      })
      .catch((err) => {
        if(err.response){
          this.setState({
            errorMessage: err.response.data.message,
          })
        }else{
          this.setState({
            errorMessage: 'something went wrong!, try again...'
          })
        }
      })
  }
  render() {
    return (
      <>
          <div className="modal is-active">
            <div className="modal-background" onClick={()=>{this.props.toggleModal('signup')}}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create an Account!</p>
                <button onClick={()=>{this.props.toggleModal('signup')}} className="delete" aria-label="close">
                </button>
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
                <small>Already have an account? <span onClick={()=>{this.props.toggleModal('both')}} style={{color:'blue', cursor:'pointer'}}>Login</span></small>
                <br /><br />
                {this.state.errorMessage}
              </section>
            </div>
          </div>
          </>
    )
  }
}

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          this.props.loggingIn(response);
        }
      })
      .catch((err) => {
        if(err.response.data){
          this.setState({
            errorMessage: err.response.data.message,
          })
        }
      })
  }
  render() {
    return (
      <>
      <div className="modal is-active">
        <div className="modal-background" onClick={()=>{this.props.toggleModal('login')}}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Log in!</p>
            <button onClick={()=>{this.props.toggleModal('login')}} className="delete" aria-label="close"></button>
          </header>   
          <section className="modal-card-body">
          <form onSubmit={this.handleSubmit} action="http://localhost:3002/users/login">
          <div className="field">
            <label className="label">E-Mail</label>
            <div className="control">
              <input className="input" onChange={this.handleChange} type="text" name="email" placeholder="email" value={this.state.email} />
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
        <small>Don't have an Account yet? <span onClick={()=>{this.props.toggleModal('both')}} style={{color:'blue', cursor:'pointer'}}>Signup</span></small>
        <br /><br />
            {this.state.errorMessage}
          </section>
        </div>
      </div>
      </>
    )
  }
}