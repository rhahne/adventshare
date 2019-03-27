import React, { Component } from 'react'
import axios from 'axios'
import ListHousing from '../general/HousingComps'
import { AboutArea } from '../general/AreaComps'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArea: [],
      activities: [],
      housing: []
    }
  }
  
  getSelectedActivity(activityId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/activities/details/' + activityId
    })
      .then((response) => {
        const { area, housingsInArea } = response.data;
        this.setState({
          selectedArea: area,
          housing: housingsInArea,
          activities: area.activity
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let activityId = parts.pop();
    this.getSelectedActivity(activityId)
  }

  render() {
    return (
      <div>
          {this.state.selectedArea.name ?
            <AboutArea area={this.state.selectedArea} allActivities={this.state.activities} /> : ''
          }
          <ListHousing housing={this.state.housing} title={"Housing in " + this.state.selectedArea.name}/>
        </div>
    )
  }
}