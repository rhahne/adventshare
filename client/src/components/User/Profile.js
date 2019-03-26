import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
      finalBookings: null,
      bookings: null,
      interests: null
    }
    this.confirm = this.confirm.bind(this);
  }
  confirm(bookingId, isConfirmed) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/bookings/confirm',
      withCredentials: true,
      params: {
        isConfirmed: isConfirmed,
        bookingId: bookingId
      }
    })
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/account',
      withCredentials: true,
    })
      .then((response) => {
        const { finalBookings, bookings, interests, sessionUser } = response.data
        debugger
        bookings.forEach(booking => {
          debugger
            if (booking.confirmation.indexOf(sessionUser._id) !== -1){
              debugger
              booking.isConfirmed = true;
            }
        })

        this.setState({
          userData: sessionUser,
          finalBookings: finalBookings,
          bookings: bookings,
          interests: interests
        })
      })
      .catch((err) => {
        debugger
        this.props.history.push('/users/login')
      })
  }
  render() {
    const user = this.state.userData ? this.state.userData : '';
    const finalBookings = this.state.finalBookings ? this.state.finalBookings : [];
    const bookings = this.state.bookings ? this.state.bookings:[];
    const interests = this.state.interests ? this.state.interests:[];
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
                      {interests.map(interest=>{
                        return <div>
                        <li><strong>Title:</strong> {interest.housing.title}</li>
                        <li><strong>Date:</strong> Week {interest.date}</li>
                        <li><strong>Status:</strong> {interest.users.length}/{interest.housing.beds} hoomans</li>
                        <a href={"/housings/"+interest.housing._id}><strong>Link</strong></a>
                        <br /><br />
                        </div>
                      })}
                      </ul>
                      <h1 className="title is-3 is-spaced">
                        Waiting Confirmation
                      </h1>
                      <ul>
                      {bookings.map(booking=>{
                        return <div className="columns">
                        <div className="column is-three-quarters">
                        <li><strong>Title:</strong> {booking.housing.title}</li>
                        <li><strong>Date:</strong> Week {booking.date}</li>
                        <li><strong>Status:</strong> {booking.users.length}/{booking.housing.beds} hoomans</li>
                        <li><strong>Confirmations:</strong> {booking.confirmation.length}/{booking.housing.beds}</li>
                        <a href={"/housings/"+booking.housing._id}><strong>Link</strong></a>
                        </div>
                        {booking.isConfirmed ? 
                        'CONFIRMED, Waiting for other people to confirm'
                        :
                        <div className="column">
                        <span className="button is-success" onClick={()=>{this.confirm(booking._id, true)}}>Yes</span>
                        <span className="button is-danger" onClick={()=>{this.confirm(booking._id, false)}}>No</span>
                        </div>
                        }
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
                      <ul>
                      {finalBookings.map(finalBooking=>{
                        return <div>
                        <li><strong>Title:</strong> {finalBooking.housing.title}</li>
                        <li><strong>Date:</strong> Week {finalBooking.date}</li>
                        <li><strong>Prepare your trip son!</strong></li>
                        <a href={"/housings/"+finalBooking.housing._id}><strong>Link</strong></a>
                        <br /><br />
                        </div>
                      })}
                      </ul>
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