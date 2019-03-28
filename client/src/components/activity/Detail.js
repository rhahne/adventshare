import React, { Component } from 'react'
import axios from 'axios'
import ListHousing from '../general/HousingComps'
import { ListAreas } from '../general/AreaComps'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      areasWithActivity: [],
      housingsWithActivity: [],
      activityInfo: []
    }
    this.getAreasWithActivity = this.getAreasWithActivity.bind(this)
    this.getHousingWithActivity = this.getHousingWithActivity.bind(this)
  }
  
  getHousingWithActivity(activityId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/activities/details/housing/' + activityId
    })
      .then((response) => {
        this.setState({
          housingsWithActivity: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getActivity(activityId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/activities/details/activity/' + activityId
    })
      .then((response) => {
        this.setState({
          activityInfo: response.data[0],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getAreasWithActivity(activityId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/activities/details/area/' + activityId
    })
      .then((response) => {
        this.setState({
          areasWithActivity: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let activityId = parts.pop();
    this.getAreasWithActivity(activityId)
    this.getHousingWithActivity(activityId)
    this.getActivity(activityId)
  }

  render() {
    let activity = this.state.activityInfo
    let housing = this.state.housingsWithActivity
    let areas = this.state.areasWithActivity


    return (
      <div>
          {areas ?
            <ListAreas title={"Great areas to go"} activity={activity} areas={areas}/> : ''
          }
          <ListHousing 
          housing={housing} 
          title={"Lovely houses for your "}
          activityTitle={activity.name} 
          activity={activity}/>

        </div>
    )
  }
}