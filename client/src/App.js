import React, { Component } from "react";
import axios from "axios";
import Loader from './components/Loader';

class App extends Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    loading:true
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
  }

  // fetch data from our data bases
  getDataFromDb = () => {
    debugger
    axios.get("/api/demo")
      .then(data => {
        debugger
        this.setState({ data: data.data, loading: false })
      });
  };


  render() {
    return (
      <div>

        { this.state.loading && <Loader /> }
        { this.state.data.map(data => {
          return <h2>{data.title}</h2>
        })}

      </div>
    );
  }
}

export default App;