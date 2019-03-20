import React, { Component } from 'react'
import TopAreas from './areas/TopAreas'

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-1">
                Adventshare
              </h1>
              <h2 class="subtitle is-3">
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
