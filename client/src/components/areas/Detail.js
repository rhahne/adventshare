import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListHousing from '../general/HousingComps'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArea: [],
      housing: []
    }
  }
  getSelectedArea() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/areas/5c923f3aa949af76694593f8'
    })
      .then((response) => {
        this.setState({
          selectedArea: response.data,
          housing: response.data.housing
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }
  componentDidMount() {
    this.getSelectedArea()
  }
  render() {
    return (
      <div>
        <h1 className="title">Housing in {this.state.selectedArea.name} (3)</h1>
        <ListHousing housing={this.state.housing} />
      </div>
    )
  }
}