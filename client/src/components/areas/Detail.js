import React, { Component } from 'react'
import axios from 'axios'
import ListHousing from '../general/HousingComps'
import { AboutArea } from '../general/AreaComps'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArea: [],
      housing: []
    }
  }
  
  getSelectedArea(areaId) {
    axios({
      method: 'get',
      url: 'http://localhost:3002/areas/details/' + areaId
    })
      .then((response) => {
        debugger
        const { area, housingsInArea } = response.data;
        this.setState({
          selectedArea: area,
          housing: housingsInArea
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let areaId = parts.pop();
    this.getSelectedArea(areaId)
  }

  render() {
    return (
      <div>
          {this.state.selectedArea.name ?
            <AboutArea area={this.state.selectedArea} /> : ''
          }
          <ListHousing housing={this.state.housing} title={"Housing in " + this.state.selectedArea.name}/>
        </div>
    )
  }
}