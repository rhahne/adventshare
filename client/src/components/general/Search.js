import React, { Component } from 'react'
import axios from 'axios'
// import SearchForm from './Search'


export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      where: '',
      activity: '',
      startdate: '',
      enddate: '',
      searched: false,
      searchQuery: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let search = this.state;

    axios({
      method: 'post',
      url: 'http://localhost:3002/search',
      data: search,
    })
      .then((response) => {
        this.setState({searchQuerry: response.data, searched: true})
      })

      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.message,
        })
      })
  }
  
  render() {
    return (
      <SearchForm/>
    )
  }
}

const SearchForm = (props) => {

  return ( <div>
    <form onSubmit={this.handleSubmit}>
    
    <div className="field">
      <label className="label">
      Where
      </label>
      <div className="control">
        <input className="input" onChange={this.handleChange} type="text" name="where" value={this.state.where} />
      </div>
    </div>
  
    <div className="field">
      <label className="label">
      What
      </label>
      <div className="select" >
        <select onChange={this.handleChange} type="text" name="activity" value={this.state.activity}>
          <option>Select</option>
          <option>Climbing</option>
          <option>Snowboarding</option>
          <option>Mountaineering</option>
          <option>Hiking</option>
        </select>
      </div>
    </div>
  
    <div className="field">
      <label className="label">
      Check-in
      </label>
      <div className="control">
        <input className="input" onChange={this.handleChange} type="date" name="startdate" value={this.state.startdate} />
      </div>
      </div>
  
    <div className="field">  
      <div>
      <label className="label">
      Check-out
      </label>
      <div className="control">
        <input className="input" onChange={this.handleChange} type="date" name="enddate" placeholder="enddate" value={this.state.enddate} />
      </div>
      </div>
    </div>
  
    <div className="control">
      <input className="button is-link" type="submit" value="Search" />
    </div>
  
    </form>
    {this.state.errorMessage}
  </div>
)}