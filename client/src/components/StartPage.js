import React, {Component} from 'react'
import {TopAreas} from './general/AreaComps'
import SearchForm from './general/Search'
import axios from 'axios'
import ListHousing from './general/HousingComps'
import ListActivity from './general/ActivityComps'
import {Container, Section } from "react-bulma-components/full"
import Loader from './Loader';

export default class StartPage extends Component {
    state = {
        loading: true
    }
    stopLoader() {
        this.setState({loading: false});
    }
    render() {
        return (
            <div>
                { this.state.loading && <Loader /> }
                <HeroHeader {...this.props} />
                <Explanation/>
                <TopAreas title={"Most popular area's"} />
                <EightRandom/>
                <FiveActivities title={"Great outdoor activities"} stopLoader={this.stopLoader.bind(this)}/>
            </div>
        )
    }
}

//------------------------------------//
//------------------------------------//
//--------// FiveActivities //--------//
//------------------------------------//
//------------------------------------//
export class FiveActivities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allActivities: [],
            fiveActivities: []
        }
    }

    getFiveActivities() {
        axios({method: 'get', url: 'http://localhost:3002/activities'})
        .then((response) => {
            let allActivities = [...response.data]
            this.setState({ 
                allActivities: response.data,
                fiveActivities: allActivities.slice(allActivities.length - 5, allActivities.length)
            })
            this.props.stopLoader()
        })
        .catch((err) => {
            //this.props.history.push('/users/login')
        })
    }
    componentDidMount() {
        this.getFiveActivities()
    }

    render () {
        return (
            <ListActivity title={this.props.title} activity={this.state.fiveActivities}/>
        )
    }
}


//------------------------------------//
//------------------------------------//
//---------// EightRandom //----------//
//------------------------------------//
//------------------------------------//
export class EightRandom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allHouses: [],
            randomEight: []
        }
    }

    getRandomEight() {
        axios({method: 'get', url: 'http://localhost:3002/housings'}).then((response) => {
            let houseList = response.data;
            this.setState({
                allHouses: houseList,
                randomEight: houseList.splice(houseList.length - 8, 8)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getRandomEight()
    }

    render() {
        return (<ListHousing
            housing={this.state.randomEight}
            title={"Houses in the best areas"}/>)
    }
}


//------------------------------------//
//------------------------------------//
//----------// HeroHeader //----------//
//------------------------------------//
//------------------------------------//
function HeroHeader(props) {
    return (
        <div className="hero-home">
            <Container>
                <Section>
                    <div
                        className="columns is-vcentered"
                        style={{
                        'maxWidth': '100vw',
                        minHeight: 'calc(100vh - 20vh)',
                        'margin': '0px',
                    }}>
                        <div className="column is-4 hero-form">
                            <h1 className="title is-spaced">
                                Book the best appartments while traveling solo
                            </h1>
                            <h2 className="subtitle is-size-4">
                                Meet other outdoor enthusiasts and share unique appartments in the best
                                locations
                            </h2>
                            <div className="" style={{}}>
                                <SearchForm {...props} />
                            </div>
                        </div>
                        <div
                            className="column is-6"
                            style={{
                            'padding': '0px',
                            'margin': '0px'
                        }}></div>
                    </div>
                </Section>
            </Container>
        </div>
    )
}

//------------------------------------//
//------------------------------------//
//----------// Explanation //---------//
//------------------------------------//
//------------------------------------//
function Explanation() {
    return (
        <Container>
            <Section>
                <div className="column is-half is-paddingless">
                    <h1 className="title">
                        Affordable solo travels in three steps
                    </h1>
                    <p
                        className="subtitle is-size-5"
                        style={{
                        marginBottom: "21px"
                    }}>
                        Adventshare is for solo outdoorsport travelers who want to rent appartments
                        without paying for empty beds.
                    </p>
                </div>
                <div className="columns is-centered">
                    <div className="column">
                        <div
                            className="card step-card is-borderless is-shadowless"
                            style={{
                            backgroundImage: 'url("/img/rowan-heuvel-21529-unsplash.jpg")'
                        }}>
                            <div className="card-content">
                                <h1
                                    className="title has-text-light has-text-weight-bold"
                                    style={{
                                    fontSize: "4em"
                                }}>
                                    Step One
                                </h1>
                            </div>
                        </div>
                        <h1
                            className="title is-4"
                            style={{
                            marginTop: '21px'
                        }}>
                            Select
                        </h1>
                        <p className="subtitle is-size-5">
                            Select the appartments you are interested in. You can select multiple apparments
                        </p>
                    </div>
                    <div className="column">
                        <div
                            className="card step-card is-borderless is-shadowless"
                            style={{
                            backgroundImage: 'url("/img/pablo-merchan-montes-772142-unsplash.jpg")'
                        }}>
                            <div className="card-content">
                                <div className="content is-flex">
                                    <h1
                                        className="title has-text-light has-text-weight-bold"
                                        style={{
                                        fontSize: "4em"
                                    }}>
                                        Step Two
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <h1
                            className="title is-4"
                            style={{
                            marginTop: '21px'
                        }}>
                            Gather
                        </h1>
                        <p className="subtitle is-size-5">
                            Wait untill enough people have shown interest in one of your selections
                        </p>
                    </div>
                    <div className="column">
                        <div
                            className="card step-card is-borderless is-shadowless"
                            style={{
                            backgroundImage: 'url("/img/david-calderon-1065248-unsplash.jpg")'
                        }}>
                            <div className="card-content">
                                <div className="content is-flex">
                                    <h1
                                        className="title has-text-light has-text-weight-bold"
                                        style={{
                                        fontSize: "4em"
                                    }}>
                                        Step Three
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <h1
                            className="title is-4"
                            style={{
                            marginTop: '21px'
                        }}>
                            Experience
                        </h1>
                        <p className="subtitle is-size-5">
                            Give a final go and start your adventure. Its gonna be sick!
                        </p>
                    </div>
                </div>
            </Section>
        </Container>
    )
}