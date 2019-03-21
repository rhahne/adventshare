import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ListAreas from '../general/AreaComps'
import { Container, Section } from "react-bulma-components/full";

export default class TopAreas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allAreas: []
    }
  }
  getAllAreas() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/areas'
    })
      .then((response) => {
        this.setState({
          allAreas: response.data
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }
  componentDidMount() {
    this.getAllAreas()
  }
  render() {
    return (
      <Container>
        <Section>
          <h1 className="title">Top recommended Areas</h1>
          <ListAreas allAreas={this.state.allAreas} />
        </Section>
      </Container>
    )
  }
}