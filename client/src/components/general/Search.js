import React, { Component } from 'react'
import axios from 'axios'
import ListHousing from './HousingComps'
import { Redirect } from "react-router-dom";
import { Container, Section } from 'react-bulma-components/full';
import ListActivity from './ActivityComps'

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
        this.setState({ searched: true, query: SearchResult })
    }

    render() {
        return (
            <div>
                {!this.state.searched
                    ? <SearchForm getSearchResult={this.getSearchResult} />
                    : <Redirect to={{
                            pathname: '/search/q',
                            state: {query: this.state.query}
                    }} />
                }
            </div>
        )
    }
}


// ---------- // SearchForm // ---------- //
export class SearchForm extends Component {
    state = {
        where: '',
        activity: '',
        startdate: '',
        enddate: '',
        errorMessage: ''
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let searchInfo = this.state;

        axios({ method: 'post', url: 'http://localhost:3002/search', data: searchInfo }).then((response) => {
            this.props.getSearchResult(response.data)
        }).catch((err) => {
            this.setState({ errorMessage: 'Errorsön' })
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
                                value={this.state.where} />
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
                                    value={this.state.startdate} />
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
                                        value={this.state.enddate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="control">
                        <input className="button is-link" type="submit" value="Search" />
                    </div>

                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}

// -------------- // SearchResponse // -------------- //
export class SearchResponse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchedHouses: this.props.location.state.query,
            eightHouses: [],
            fiveActivities: []
        }
    }

    getEightHouses = () => {
        let houseList = this.state.searchedHouses
        this.setState({
            eightHouses: houseList.splice(houseList.length - 8, 8)
        })
    }

    getFiveActivities = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3002/areas/activities'
        })
        .then(response => {
            let allActivities = [];
            let areaList = response.data
            areaList.forEach(area => {
                allActivities.push(...area.activity)
            })
            const uniq = new Set(allActivities.map(e => JSON.stringify(e)));
            const filteredActivities = Array.from(uniq).map(e => JSON.parse(e));
            this.setState({
                fiveActivities: filteredActivities.splice(filteredActivities.length - 5, 5)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getEightHouses()
        this.getFiveActivities()
    }

    render() {
        return (
                <Container>
                    <Section>
                        <h1 className="title is-3">Where to stay</h1>
                        <ListHousing housing={this.state.eightHouses} />
                    </Section>
                    <Section>
                        <h1 className="title is-3">What to do</h1>
                        {this.state.fiveActivities?<ListActivity activity={this.state.fiveActivities} />:""}                       
                    </Section>
                </Container>
        )
    }
}

