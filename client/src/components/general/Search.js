import React, {Component} from 'react'
import axios from 'axios'
import ListHousing from './HousingComps'
import {Redirect} from "react-router-dom";
import ListActivity from './ActivityComps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//------------------------------------//
//------------------------------------//
//------------// SEARCH //------------//
//------------------------------------//
//------------------------------------//
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchRes: [],
            searched: false,
            searchInput: []
        }
        this.getSearchResult = this.getSearchResult.bind(this);
        this.sendQueryUp = this.sendQueryUp.bind(this);
    }

    getSearchResult(SearchResult) {
        this.setState({searched: true, searchRes: SearchResult})
    }

    sendQueryUp(searchQuery) {
        this.setState({searchInput: searchQuery})
    }



    // TRYING TO PREVENT INF LOOP FROM MODAL<<<<
    // -----------------------------------------
    // -----------------------------------------
    // -----------------------------------------
    // -----------------------------------------
    // componentWillMount () { 
    //     {this.props.modalSearch ? this.setState({searched: false}) : "" } 
    // }

    render() {
        return (
            <div>
                {!this.state.searched
                    ? <SearchForm getSearchResult={this.getSearchResult} sendQueryUp={this.sendQueryUp}/>
                    : <Redirect
                        to={{
                        pathname: '/search/q',
                        state: {
                            searchRes: this.state.searchRes,
                            searchInput: this.state.searchInput
                        }
                    }}/>
}
            </div>
        )
    }
}

//------------------------------------//
//------------------------------------//
//----------// SEARCH FORM //---------//
//------------------------------------//
//------------------------------------//
export class SearchForm extends Component {
    state = {
        where: '',
        activity: '',
        startdate: '',
        enddate: '',
        errorMessage: ''
    }

    handleChange = (event) => {
        let {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let searchInfo = this.state;
        this.props.sendQueryUp(searchInfo);

        axios({method: 'post', url: 'http://localhost:3002/search', data: searchInfo}).then((response) => {
            this.props.getSearchResult(response.data)
        }).catch((err) => {
            this.setState({errorMessage: 'Errorsön'})
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div className="field">
                        <label className="label">
                            Where
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                onChange={this.handleChange}
                                type="text"
                                name="where"
                                value={this.state.where}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">
                            What
                        </label>
                        <div className="select">
                            <select
                                onChange={this.handleChange}
                                type="text"
                                name="activity"
                                value={this.state.activity}>
                                <option>Select</option>
                                <option>Climbing</option>
                                <option>Snowboarding</option>
                                <option>Mountaineering</option>
                                <option>Hiking</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-double">
                        <div className="field">
                            <label className="label">
                                Check-in
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    onChange={this.handleChange}
                                    type="date"
                                    name="startdate"
                                    value={this.state.startdate}/>
                            </div>
                        </div>

                        <div className="field">
                            <div>
                                <label className="label">
                                    Check-out
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        onChange={this.handleChange}
                                        type="date"
                                        name="enddate"
                                        placeholder="enddate"
                                        value={this.state.enddate}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="control">
                        <input className="button is-link" type="submit" value="Search"/>
                    </div>

                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}

//------------------------------------//
//------------------------------------//
//--------// SearchResponse //--------//
//------------------------------------//
//------------------------------------//
export class SearchResponse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchedHouses: this.props.location.state.searchRes,
            eightHouses: [],
            fiveActivities: [],
            searchInput: this.props.location.state.searchInput
        }
 
    }

    getEightHouses = () => {
        let houseList = this.state.searchedHouses
        this.setState({
            eightHouses: houseList.splice(houseList.length - 8, 8)
        })
    }

    getFiveActivities = () => {
        let areaList = this.state.searchedHouses.map(house => {
                return house.area
            })
        let allActivities = [];
        areaList.forEach(area => {
            allActivities.push(...area.activity)
        })
        const uniq = new Set(allActivities.map(e => JSON.stringify(e)));
        const filteredActivities = Array.from(uniq).map(e => JSON.parse(e));
        const fiveActivities = [...filteredActivities.splice(filteredActivities.length - 5, 5)]
        this.setState({fiveActivities: fiveActivities})
    }

    componentDidMount() {
        this.getEightHouses()
        this.getFiveActivities()
    }

    render() {
        return (
            <div>
                
                <SearchSummary searchInput={this.state.searchInput} toggleModal={this.props.toggleModal} />

                <ListHousing title={"Where to stay"} housing={this.state.eightHouses}/> {this.state.fiveActivities
                    ? <ListActivity title={"What to do"} activity={this.state.fiveActivities}/>
                    : ""}
            </div>
        )
    }
}

//------------------------------------//
//------------------------------------//
//--------// SEARCH SUMMARY //--------//
//------------------------------------//
//------------------------------------//
const SearchSummary = function (props) {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{borderBottom:"solid 1px hsl(0, 0%, 96%)"}}>
            <div className="container">
                <div style={{}}>
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div 
                                    className="button is-info" 
                                    onClick={()=>{props.toggleModal('search')}}>
                                    <FontAwesomeIcon style={{marginRight: "5px"}} icon="search" />
                                    {props.searchInput.where}
                                </div>
                                <div 
                                    className="button is-info" 
                                    onClick={()=>{props.toggleModal('search')}}>
                                    {props.searchInput.activity}
                                </div>
                                <div 
                                    className="button is-info" 
                                    onClick={()=>{props.toggleModal('search')}}>
                                    <FontAwesomeIcon style={{marginRight: "5px"}} icon="calendar-week" />
                                    {props.searchInput.startdate}
                                </div>
                                <div 
                                    className="button is-info" 
                                    onClick={()=>{props.toggleModal('search')}}>
                                    <FontAwesomeIcon style={{marginRight: "5px"}} icon="calendar-week" />
                                    {props.searchInput.enddate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </nav>
        
    )
}

//------------------------------------//
//------------------------------------//
//------------SEARCH MODAL------------//
//------------------------------------//
//------------------------------------//
export class SearchModal extends Component {
    render() {
      return (
        <>
        <div className="modal is-active">
          <div 
          className="modal-background" 
          onClick={()=>{this.props.toggleModal('search')}}>
          </div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                Search Sön
              </p>
              <button 
                className="delete" 
                aria-label="close" 
                onClick={()=>{this.props.toggleModal('search')}}>
              </button>
            </header>

            <section className="modal-card-body">
                <div>
                    <Search modalSearch={true}/>
                </div>
            </section>
          </div>
        </div>
        </>
      )
    }
  }