import React, { Component } from 'react'
import axios from 'axios'

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHousing: []
    }
  }
  getSelectedArea() {
    axios({
      method: 'get',
      url: 'http://localhost:3002/housings/5c924c8ba949af7669459959'
    })
      .then((response) => {
        this.setState({
          selectedHousing: response.data
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
    return (
      <div>
        <h1 className="title">{this.state.selectedHousing.title}</h1>
        <ul>
          
        </ul>
      </div>
    )
  }
}
