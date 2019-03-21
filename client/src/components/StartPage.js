import React, { Component } from 'react'
import { TopAreas } from './general/AreaComps'
import SearchForm from './general/Search'
import { Container, Section } from "react-bulma-components/full";

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <HeroHeader/>
        <TopAreas />
        <Explanation />
        {/* <JustBooked /> */}
      </div>
    )
  }
}

function HeroHeader() {
return (
  <div className="hero-home">
  <Container>
  <Section>
    <div className="columns is-vcentered" style={{'maxWidth': '100vw', 'margin': '0px'}}>
      <div className="column is-4" style={{'textAlign': 'left', backgroundColor: "hsl(0, 0%, 100%)", 'padding': "2.5%", 'borderRadius': "5px" }}>
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
          <div className="card-content step-card-content">
            {/* <div className="content is-flex"> */}
              <h1 className="title has-text-light has-text-weight-bold has-text-justified" style={{fontSize: "4.5em"}}>
              Step One
              </h1>
            {/* </div> */}
          </div> 
        </div>
          <p className="subtitle is-size-5" style={{marginTop:'10px' }}>
                Select the appartments you are interested in (select multiple)
          </p>
        </div>

        <div className="column">
          <div className="card step-card" style={{backgroundImage: 'url("/img/pablo-merchan-montes-772142-unsplash.jpg")'}}>
          <div className="card-content step-card-content">
            <div className="content is-flex">
              <h1 className="title has-text-light has-text-weight-bold has-text-justified" style={{fontSize: "4.5em"}}>
              Step Two
              </h1>
            </div>
          </div> 
        </div>
          <p className="subtitle is-size-5" style={{marginTop:'10px' }}>
          Wait untill enough people have show interest in one of your selections
          </p>
        </div>

        <div className="column">
          <div className="card step-card" style={{backgroundImage: 'url("/img/david-calderon-1065248-unsplash.jpg")'}}>
          <div className="card-content step-card-content">
            <div className="content is-flex">
              <h1 className="title has-text-light has-text-weight-bold has-text-justified" style={{fontSize: "4.5em"}}>
              Step Three
              </h1>
            </div>
          </div> 
        </div>
          <p className="subtitle is-size-5" style={{marginTop:'10px' }}>
          Give a final go and start your adventure. Its gonna be sick!
          </p>
        </div>

        </div>
      </Section>
    </Container>
  )
}