import React, { Component } from 'react'
import {TopAreas} from './general/AreaComps'
import SearchForm from './general/Search'
import axios from 'axios'
import  ListHousing  from './general/HousingComps'
import { Container, Section } from "react-bulma-components/full"

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <HeroHeader/>
        <Explanation />
        <TopAreas />
        <EightRandom />
      </div>
    )
  }
}

export class EightRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHouses: [],
      randomEight: []
    }
  }

  getRandomEight() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings'
    })
    .then((response) => {
      debugger
      let houseList = response.data;
      this.setState({
        allHouses: houseList,
        randomEight: houseList.splice(houseList.length - 8, 8)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getRandomEight()
  }

  render() {
    return(
      <Container>
        <Section>
          <h1 className="title is-3">Houses in the best areas</h1>
          <ListHousing housing={this.state.randomEight} />
        </Section>
      </Container>
    )
  }
}

function HeroHeader() {
return (
  <div className="hero-home">
  <Container>
  <Section>
    <div className="columns is-vcentered" style={{'maxWidth': '100vw', minHeight: '100vh', 'margin': '0px'}}>
      <div className="column is-4 hero-form">
        <h1 className="title is-spaced">
          Book the best appartments while traveling solo
        </h1>
        <h2 className="subtitle is-size-4">
          Meet other outdoor enthausiasts and share unique appartments in the best locations
        </h2>
        <div className="" style={{}}>
          <SearchForm />
        </div>
      </div>
      <div className="column is-6" style={{'padding': '0px', 'margin': '0px'}}>
      </div>
    </div>
    </Section>
    </Container>
  </div>
  )
}

function Explanation() {
  return (
    <Container>
      <Section>
        <div className="column is-half is-paddingless">
        <h1 className="title">
          Affordable solo travels in three steps 
        </h1>
        <p className="subtitle is-size-5" style={{marginBottom: "21px"}}>
          Adventshare is for solo outdoorsport travelers who want to rent appartments without paying for empty beds. 
        </p>
        </div>
        <div className="columns is-centered">


          <div className="column">
          <div className="card step-card" style={{backgroundImage: 'url("/img/rowan-heuvel-21529-unsplash.jpg")'}}>
          <div className="card-content">
              <h1 className="title has-text-light has-text-weight-bold" style={{fontSize: "4em"}}>
              Step One
              </h1>
          </div> 
        </div>
        <h1 className="title is-4" style={{marginTop: '21px'}}>
        Select 
        </h1>
        <p className="subtitle is-size-5">
              Select the appartments you are interested in. You can select multiple apparments
        </p>
        </div>

        <div className="column">
          <div className="card step-card" style={{backgroundImage: 'url("/img/pablo-merchan-montes-772142-unsplash.jpg")'}}>
          <div className="card-content">
            <div className="content is-flex">
              <h1 className="title has-text-light has-text-weight-bold" style={{fontSize: "4em"}}>
              Step Two
              </h1>
            </div>
          </div> 
        </div>
        <h1 className="title is-4" style={{marginTop: '21px'}}>
        Gather 
        </h1>
        <p className="subtitle is-size-5">
          Wait untill enough people have shown interest in one of your selections
          </p>
        </div>

        <div className="column">
          <div className="card step-card" style={{backgroundImage: 'url("/img/david-calderon-1065248-unsplash.jpg")'}}>
          <div className="card-content">
            <div className="content is-flex">
              <h1 className="title has-text-light has-text-weight-bold" style={{fontSize: "4em"}}>
              Step Three
              </h1>
            </div>
          </div> 
        </div>
        <h1 className="title is-4" style={{marginTop: '21px'}}>
        Experience 
        </h1>
        <p className="subtitle is-size-5">
          Give a final go and start your adventure. Its gonna be sick!
          </p>
        </div>

        </div>
      </Section>
    </Container>
  )
}