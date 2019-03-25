import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AboutArea, TopAreas } from '../general/AreaComps'
import ListActivity from '../general/ActivityComps'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHousing: [],
      selectedArea: []
    }
  }

  getSelectedHousing(housingId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings/'+ housingId
    })
      .then((response) => {
        debugger
        this.setState({
          selectedHousing: response.data,
          selectedArea: response.data.area,
          allActivities: [...response.data.area.activity],
          fiveAreaActivities: response.data.area.activity.splice(response.data.area.activity.length - 5, 5)
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  // getFiveAreaActivities = () => {
  //   let allAreaActivities = this.state.areaActivities;
  //   this.setState({
  //     fiveAreaActivities: allAreaActivities.splice(allAreaActivities.length - 5, 5)
  //   })
  // }

  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let housingId = parts.pop();
    this.getSelectedHousing(housingId)
    // this.getFiveAreaActivities()
  }

  render() {
    const housing = this.state.selectedHousing
    const area = this.state.selectedArea
    const activities = this.state.fiveAreaActivities
    const allActivities = this.state.allActivities

    debugger
    return (
      <div>
        {housing.title ?
          <HouseDetail housing={housing} /> : ''
        }
        <hr className="hr"/>
        <Container>
          <Section>
              {area.name ? 
            <AboutArea area={area} allActivities={allActivities}/>:''
          }
          </Section>
        </Container>
        <hr className="hr"/>
        <Container>
          <Section>
          <h1 className="title is-3">Best activities in {area.name}</h1>
        {activities?
        <ListActivity activity={activities} />:""}
        </Section>
        </Container>   
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
                <a className="button is-info" href="/">Show Interest</a>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}