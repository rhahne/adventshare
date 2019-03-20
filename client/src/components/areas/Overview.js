import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Overview extends Component {
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
      <div>
        <h1 className="title">Overview of all the areas</h1>
        <ul>
        <div class="columns">
          <div class="column is-half">
          {this.state.allAreas.map((area) => {
            return <div className="areaBox">
              <Link to={'/areas/'+area._id}>
                <h2 className="title is-4">{area.name}</h2>
              </Link>
              <p>description: {area.description}</p>
              <p>Climbing Areas</p>
              <ul>
                {area.climbing_areas.map((climbingArea) => {
                  return <li> --> {climbingArea}</li>
                })}
              </ul>
            </div>
      })}
          </div>
        </div>
         
        </ul>
      </div>
    )
  }
}

/*
<div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img src={area.img[0]} alt="dsadas" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <h3 className="title">{area.name}</h3>
                        <p>{area.description}</p>
                      </div>
                    </div>
                  </div>
                  */