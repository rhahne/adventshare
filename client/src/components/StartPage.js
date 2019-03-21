import React, { Component } from 'react'
import TopAreas from './areas/TopAreas'
import SearchForm from './general/Search'
import { Container, Section } from "react-bulma-components/full";

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <HeroHeader/>
        <TopAreas />
      </div>
    )
  }
}


function HeroHeader() {
return(
  <div className="hero-home">
  <Section>
    <div className="columns is-vcentered" style={{'maxWidth': '100vw', 'margin': '0px'}}>
      <div className="column">
      </div>

      <div className="column is-5" style={{'textAlign': 'left', backgroundColor: "grey", }}>
        <h1 id="hero-text-overview" className="title is-spaced">
          Book the best appartments while traveling solo
        </h1>
        <h2 className="subtitle" style={{'fontSize': '1.5em'}}>
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
  </div>
  )
}
