import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArea: [],
      housing: []
    }
  }
  getSelectedArea() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/areas/5c923f3aa949af76694593f8'
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
    this.getSelectedArea()
  }
  render() {
    const housing = this.state.housing;
    return (
      <div>
        <h1 className="title">Housing in {this.state.selectedArea.name} (3)</h1>

        <div className="columns">
          {housing.map((house) => {
            return <div className="column">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="/img/jura/jura1.jpg" alt="dsadas" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <h3 className="title">{house.title}</h3>
                    <p>{house.description}</p>
                    <Link to={"/housings/"+house._id} className="button is-light">See More</Link>
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