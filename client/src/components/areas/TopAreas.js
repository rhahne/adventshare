import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
      <div>
        <h1 className="title">Top recommended Areas</h1>
        <div className="columns">
          {this.state.allAreas.map((area) => {
            return <div className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={area.img[0]} alt="dsadas" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <h3 className="title">{area.name}</h3>
                    <p>{area.description}</p>
                    <Link to={"/areas/"+area._id} className="button is-light">See More</Link>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}