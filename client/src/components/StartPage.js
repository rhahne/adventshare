import React, { Component } from 'react'
import TopAreas from './areas/TopAreas'

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">
                Adventshare
              </h1>
              <h2 className="subtitle is-3">
                Le subtitle
              </h2>
            </div>
          </div>
        </section>
        <TopAreas />
      </div>
    )
  }
}
