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
          {this.state.selectedArea.name?
          <AboutArea area={this.state.selectedArea}/>:''
          }
          <br />
          <br />
          <br />
          <br />

          <h1 className="title">Housing in {this.state.selectedArea.name} ({this.state.housing.length})</h1>
          <ListHousing housing={this.state.housing} />
        </Section>
      </Container>
    )
  }
}

export const AboutArea = function (props) {
  const area = props.area
  return (
    <div>
      <h1 className="title">About the Area <span style={{textDecoration:'underline'}}>{area.name}</span></h1>
      <div className="columns">
        <div className="column">
          <img src={area.img[0]} alt="area-img" />
        </div>
        <div className="column">

        </div>
      </div>
    </div>
  )
}