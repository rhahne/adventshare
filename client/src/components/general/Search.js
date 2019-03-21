import React, {Component} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'

// ------ // Search // ------ //
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [],
            searched: false,
        }
        this.getSearchResult = this
            .getSearchResult
            .bind(this)
    }

    getSearchResult(SearchResult) {
      debugger
        this.setState({searched: true, query: SearchResult})
    }

    render() {
        return (
            <div>
                {!this.state.searched
                    ? <SearchForm getSearchResult={this.getSearchResult}/>
                    : <SearchResponse query={this.state.query} formFill={this.state.formFill}/>
}
            </div>
        )
    }
}

// ---------- // SearchForm // ---------- //
class SearchForm extends Component {
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

        axios({method: 'post', url: 'http://localhost:3002/search', data: searchInfo}).then((response, formFill) => {
            this.props.getSearchResult(response.data, formFill)
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

                    <div className="control">
                        <input className="button is-link" type="submit" value="Search"/>
                    </div>

                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}

// -------------- // SearchResponse // -------------- //
class SearchResponse extends Component {
    render() {
        return (
            <div>
                    <div className="container">

                        <div className="columns is-multiline">
                            {this.props.query
                                .map((housing) => {
                                    return <div className="column is-4">
                                        <Link to={"/housings/" + housing._id}>
                                            <img style={{'borderRadius': '2px'}} src={housing.img[0]} alt=""/>
                                            <small className="is-size-7 has-text-grey is-uppercase has-text-weight-bold">
                                            {housing.address.city}, {housing.address.country} - {housing.area[0]} </small>
                                            <p style={{"margin": "0px"}} className="title is-5 is-capitalized">
                                              {housing.title}
                                            </p>
                                            <p className="has-text-dark">
                                              {"€"+ housing.pricing + " per night"}
                                            </p>
                                            </Link>
                                        </div>
                                })}
                        </div>
                    </div>
            </div>
        )
    }
}