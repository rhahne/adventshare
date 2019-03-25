import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AboutArea, TopAreas } from '../general/AreaComps'
import { library } from '@fortawesome/fontawesome-svg-core';

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHousing: [],
      selectedArea: [],
      interested: false,
      currentUserId: this.props.currentUserId
    }
    this.showInterest = this.showInterest.bind(this)
    this.deleteInterest = this.deleteInterest.bind(this)
  }
  getSelectedHousing(housingId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings/'+housingId,
      withCredentials: true
    })
      .then((response) => {
        this.setState({
          selectedHousing: response.data,
          selectedArea: response.data.area
        })
        this.isUserInterested(response.data.interests)
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  showInterest() {
    let parts = window.location.pathname.split('/');
    let housingId = parts.pop();
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings/'+housingId+'/interest',
      withCredentials: true
    })
      .then((response) => {
        this.isUserInterested(response.data.interests)
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  deleteInterest() {
    let parts = window.location.pathname.split('/');
    let housingId = parts.pop();
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings/'+housingId+'/deleteInterest',
      withCredentials: true
    })
      .then((response) => {
        this.setState({
          interested: false
        })
        this.isUserInterested(response.data.interests)
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }
  
  isUserInterested(allInterests) {
    allInterests.forEach((interestId)=>{
      if (interestId === this.props.currentUserId._id){
        this.setState({
          interested: true
        })
      }
    })
  }
  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let housingId = parts.pop();
    this.getSelectedHousing(housingId)
  }

  render() {
    const housing = this.state.selectedHousing
    const area = this.state.selectedArea
    return (
      <div>
        {housing.title ?
          <HouseDetail housing={housing} isInterested={this.state.interested} showInterest={this.showInterest} deleteInterest={this.deleteInterest}/> : ''
        }
        <hr />
        <Container>
          <Section>
              {area.name ? 
            <AboutArea area={area}/>:''
          }
          </Section>
        </Container>
        <hr />
        <TopAreas />
      </div>
    )
  }
}

const HouseDetail = function (props) {
  const housing = props.housing
  return (
    <div>
      <div className="imageBox" style={{ backgroundImage: 'url('+housing.img[0]+')' }}>
      </div>
      <Container>
        <Section>
          <div className="columns">
            <div className="column is-two-thirds">
              <h1 className="title">{housing.title}</h1>
              <div className="columns">
                <div className="column is-custom-icon">
                <FontAwesomeIcon icon="location-arrow" />
                </div>
                <div className="column">
                  {housing.address.city} - {housing.address.country}
                </div>
              </div>
              <hr />
              <div className="columns">
                <div className="column is-custom-icon">
                  <FontAwesomeIcon icon="info" />
                </div>
                <div className="column">
                  {housing.description}
                </div>
              </div>
              <hr />
              <div className="columns">
                <div className="column is-custom-icon">
                <FontAwesomeIcon icon="bed" />
                </div>
                <div className="column">
                {housing.beds} beds
                </div>
              </div>
            </div>
            <div className="column">
              <div className="booking-box">
                <p className="has-text-dark price">
                  {"€" + housing.pricing + " per night"}
                  <br />
                  <br />
                  <FontAwesomeIcon icon="star" />
                  <FontAwesomeIcon icon="star" />
                  <FontAwesomeIcon icon="star" />
                  <FontAwesomeIcon icon="star" />
                  <FontAwesomeIcon icon="star" />
                </p>
                <hr />
                Traveldates:
                  <div className="columns traveldate-box">
                  <div className="column">
                    23.09.2019
                    </div>
                  <div className="column">
                    -->
                    </div>
                  <div className="column">
                    29.09.2019
                    </div>
                </div>
                <div className="columns">
                  <div className="column">
                    6 nights x $40
                    </div>
                  <div className="column">
                    = $240
                    </div>
                </div>
                <hr />
                {props.isInterested?
                <>
                <div className="button is-warning">Interested</div>
                <button className="delete" onClick={props.deleteInterest}>X</button>
                </>
                :
                <button className="button is-info" onClick={props.showInterest}>Show Interest</button>}
                <hr />
                <strong>Interested Hoomans:</strong>
                <br /><br />
                <ul>
                  {housing.interests.map((interest) => {
                    return <li>{interest.firstname}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

/*

                <Link className="button is-info" to={'/housings/'+housing._id+'/interest'}>
                  Show Interest
                </Link>
                */