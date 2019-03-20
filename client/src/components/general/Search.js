import React, {Component} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'

// ------ // Search // ------ //
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [
                {
                    "title": "Picturesque, Historic Villa with Island Views",
                    "description": "Gaze over stunning 180-degree views of Lago Maggiore from the expansive, floor-t" +
                            "o-ceiling windows of this lovely, 300-year-old rustic stone villa. Most of the a" +
                            "rea's main attractions are visible including the three islands, Villa Taranto ga" +
                            "rdens and Santa Caterina monastery. Comfortable furnishings in timeless styles p" +
                            "erfectly complement the historic architecture.  The peaceful garden and hammocks" +
                            " are great for relaxing in and on hot days you'll find plenty of shade. There is" +
                            " also a large trampoline for children to let off some steam.",
                    "img": [
                        "./img/housing/stresa-img-1.jpg", "./img/housing/stresa-img-2.jpg", "./img/housing/stresa-img-3.jpg"
                    ],
                    "address": {
                        "street": "Boschdijk",
                        "number": "10",
                        "city": "Stela",
                        "postalcode": "1062HK",
                        "country": "Italy"
                    },
                    "area": ["Lauterbrunnen", "Boschdijk"],
                    "pricing": 40,
                    "beds": 3
                }, {
                    "title": "Charming Farmhouse in Nature",
                    "description": "Welcome to our charming farmhouse in nature! Stechelberg is a small village in t" +
                            "he heart of the Bernese Oberland with brilliant and short connections to Schilth" +
                            "orn (007 film location) and the Jungfrau (Top of Europe).",
                    "img": [
                        "./img/housing/lauter-img-1.jpg", "./img/housing/lauter-img-2.jpg", "./img/housing/lauter-img-3.jpg"
                    ],
                    "address": {
                        "street": "Lauterbrunnen",
                        "number": "13",
                        "city": "Stela",
                        "postalcode": "1072HK",
                        "country": "Italy"
                    },
                    "area": ["Lauterbrunnen", "Boschdijk"],
                    "pricing": 70,
                    "beds": 20
                }, {
                    "title": "Anzere, Swiss Alps nr Crans-Montana",
                    "description": "This large, bright, south facing studio in the heart of the Swiss Apls, sits on " +
                            "a sunny terrace at 1500m. It has sweeping views across the Rhone Valley. There i" +
                            "s a bedroom area (separated from the living room by glass doors), kitchen and sh" +
                            "ower room. We have high speed internet.",
                    "img": [
                        "./img/housing/ayent-img-1.jpg", "./img/housing/ayent-img-2.jpg", "./img/housing/ayent-img-3.jpg"
                    ],
                    "address": {
                        "street": "ayent",
                        "number": "10",
                        "city": "ayent",
                        "postalcode": "1337",
                        "country": "Swiss"
                    },
                    "area": ["Lauterbrunnen", "Boschdijk"],
                    "pricing": 90,
                    "beds": 22
                }, {
                    "title": "mayen Val d'Herens en Valais - Sion",
                    "description": "Calm, contemplation, returning to the roots, walks within nature, rest... The Ma" +
                            "yen is the cosy place to be...a former barn-stable which has been transformed in" +
                            " a modern way of living with all necessary commodities, a real little Paradis in" +
                            " Valais.",
                    "img": [
                        "./img/housing/sage-img-1.jpg", "./img/housing/sage-img-2.jpg", "./img/housing/sage-img-3.jpg"
                    ],
                    "address": {
                        "street": "Val D'Herens",
                        "number": "99",
                        "city": "Sage",
                        "postalcode": "7331",
                        "country": "Italy"
                    },
                    "area": ["Lauterbrunnen", "Boschdijk"],
                    "pricing": 42,
                    "beds": 9
                }

            ],
            searched: true
        }
        this.getSearchResult = this
            .getSearchResult
            .bind(this)
    }

    getSearchResult(SearchResult) {
        this.setState({searched: true, query: SearchResult})
    }

    render() {
        return (
            <div>
                {!this.state.searched
                    ? <SearchForm getSearchResult={this.getSearchResult}/>
                    : <SearchResponse query={this.state.query}/>
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

        axios({method: 'post', url: 'http://localhost:3002/search', data: searchInfo}).then((response) => {
            debugger
            this
                .props
                .getSearchResult(response.data)
        }).catch((err) => {
            debugger
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