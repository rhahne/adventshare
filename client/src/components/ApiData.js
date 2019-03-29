import React, { Component } from 'react'
import axios from "axios";
import Loader from './Loader';

export default class ApiData extends Component {  
    // initialize our state 
    state = {
      data: [],
      loading: true
    };
  
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has 
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
    }
  
    // fetch data from our data bases
    getDataFromDb = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/demo`)
        .then(data => {
          this.setState({ data: data.data, loading: false })
        });
    };
  render() {
    return (
      <div>
        <h2>Hello there</h2>
        { this.state.loading && <Loader /> }
        { this.state.data.map(data => {
          return <h2>{data.title}</h2>
        })}
      </div>
    )
  }
}
