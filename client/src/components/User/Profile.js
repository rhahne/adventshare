import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    this.getBookingData()
  }

  componentDidMount() {
    this.getBookingData()
  }

  getBookingData() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/users/account',
      withCredentials: true,
    })
      .then((response) => {
        const { finalBookings, bookings, interests, sessionUser } = response.data
        bookings.forEach(booking => {
          if (booking.confirmation.indexOf(sessionUser._id) !== -1) {
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
        this.props.history.push('/users/login')
      })
  }
  render() {
    const user = this.state.userData ? this.state.userData : '';
    const finalBookings = this.state.finalBookings ? this.state.finalBookings : [];
    const bookings = this.state.bookings ? this.state.bookings : [];
    const interests = this.state.interests ? this.state.interests : [];
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
                      {interests.map(interest => {
                        return <div className="media">
                          <div className="media-left">
                            <FontAwesomeIcon icon="info-circle" />
                          </div>
                          <div className="media-content">
                            <p><strong>{interest.housing.title}</strong></p>
                            <p>2019 Week {interest.date}</p>
                            <p>{interest.users.length}/{interest.housing.beds} interested Adventsharers</p>
                          </div>
                          <div className="media-right">
                            <a href={"/housings/" + interest.housing._id}>
                              <FontAwesomeIcon icon="link" />
                            </a>
                          </div>
                        </div>
                      })}
                      
                      <hr className="hr" />

{/* ------------ */}
{/* CONFIRMATION */}
{/* ------------ */}
                      <h1 className="title is-3 is-spaced">
                        Waiting Confirmation
                      </h1>
                      <ul>
                        {bookings.map(booking => {
                          return <div className="media">
                          <div className="media-left">
                            <FontAwesomeIcon icon="question-circle" />
                          </div>
                          <div className="media-content">
                            <p><strong>{booking.housing.title}</strong></p>
                            <p>2019 Week {booking.date}</p>
                            <p>{booking.users.length}/{booking.housing.beds} interested Adventsharers</p>
                            <p>{booking.confirmation.length}/{booking.housing.beds} confirmations</p>
                          </div>
                          <div className="media-right" style={{textAlign: 'right'}}>
                            <a href={"/housings/" + booking.housing._id}>
                              <FontAwesomeIcon icon="link" />
                            </a>
                              <br /><br />
                              {booking.isConfirmed ?
                                <FontAwesomeIcon icon="check-circle" />
                              :
                              <>
                              <span className="button is-success" onClick={() => { this.confirm(booking._id, true) }}><FontAwesomeIcon icon="check-circle" /></span>
                              <span className="button is-danger" onClick={() => { this.confirm(booking._id, false) }}><FontAwesomeIcon icon="times-circle" /></span>
                              </>}
                          </div>
                        </div>
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

{/* -------- */}
{/* BOOKINGS */}
{/* -------- */}
                <div className="column is-one-third">
                  <div className="card is-shadowless">
                    <div className="card-content">
                      <h1 className="title is-3 is-spaced">
                        Bookings
                      </h1>
                      <ul>
                        {finalBookings.map(finalBooking => {
                          return <div className="media">
                          <div className="media-left">
                            <FontAwesomeIcon icon="check-circle" />
                          </div>
                          <div className="media-content">
                            <p><strong>{finalBooking.housing.title}</strong></p>
                            <p>2019 Week {finalBooking.date}</p>
                            <p>{finalBooking.users.length}/{finalBooking.housing.beds} interested Adventsharers</p>
                          </div>
                          <div className="media-right">
                            <a href={"/housings/" + finalBooking.housing._id}>
                              <FontAwesomeIcon icon="link" />
                            </a>
                          </div>
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