import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
      bookings: null
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/account',
      withCredentials: true,
    })
      .then((response) => {
        this.setState({
          userData: response.data,
          bookings: response.data.bookings
        })
      })
      .catch((err) => {
        this.props.history.push('/users/login')
      })
  }
  render() {
    const user = this.state.userData ? this.state.userData : '';
    const bookings = this.state.bookings ? this.state.bookings:[];
    debugger
    return (
      <Container>
        <Section className="hero is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 is-spaced">
                Profile
              </h1>
              <h2 className="subtitle">
                Hi <strong>{user.firstname}</strong>, welcome to your profile page.
             </h2>
              <p className="content">
                Here you can manage your interests, bookings and account details
              </p>
              <hr className="hr" />
              <br /><br />
              <div className="columns is-variable is-3">
                <div className="column is-one-third">
                  <div className="card is-shadowless">
                    <div className="card-content">
                      <h1 className="title is-3 is-spaced">
                        Details
                      </h1>
                      <div className="content">
                        <ul className="no-list-style">
                          <li>
                            <strong>Name</strong><br />
                            {user.firstname}
                          </li><br />
                          <li>
                            <strong>E-Mail</strong> <br />
                            {user.email}
                          </li><br />
                          <li>
                            <strong>Bio</strong><br />
                            {user.bio}
                          </li>
                        </ul>
                        <div className="button-combo" style={{ display: 'flex' }}>
                          <a href="/users/edit" className="button is-primary">Logout</a>
                          <a href="/users/edit" className="button is-primary">Edit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-one-third">
                  <div className="card is-shadowless">
                    <div className="card-content">
                      <h1 className="title is-3 is-spaced">
                        Interests
                      </h1>
                      <ul>
                      {bookings.map(booking=>{
                        return <div>
                        <li><strong>Title:</strong> {booking.housing.title}</li>
                        <li><strong>Date:</strong> Week {booking.date}</li>
                        <li><strong>Status:</strong> {booking.users.length}/{booking.housing.beds} hoomans</li>
                        <a href={"/housings/"+booking.housing._id}><strong>Link</strong></a>
                        <br /><br />
                        </div>
                      })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="card is-shadowless">
                    <div className="card-content">
                      <h1 className="title is-3 is-spaced">
                        Bookings
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    )
  }
}

/*




      <Container>
        <Section>
          {this.state.userData ?
            <>
              <h1 className="title">Your Account</h1>
              <ul>
                <li>Firstname: {this.state.userData.firstname}</li>
                <li>Email: {this.state.userData.email}</li>
                <li>Bio: {this.state.userData.bio}</li>
              </ul>
            </>
            :
            <h2>log in dude!</h2>}
        </Section>
      </Container>

      */