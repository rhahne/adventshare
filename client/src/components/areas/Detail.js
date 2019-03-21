import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Section } from 'react-bulma-components'
import ListHousing from '../general/HousingComps'

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
      url: 'http://localhost:3002/areas/'+areaId
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
    let parts = window.location.pathname.split('/');
    let areaId = parts.pop();
    this.getSelectedArea(areaId)
  }
  render() {
    return (
      <Container>
        <Section>
          <h1 className="title">Housing in {this.state.selectedArea.name} ({this.state.housing.length})</h1>
          <ListHousing housing={this.state.housing} />
        </Section>
      </Container>
    )
  }
}