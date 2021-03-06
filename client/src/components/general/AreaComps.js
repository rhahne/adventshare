import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import {Container, Section} from 'react-bulma-components'

export class TopAreas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allAreas: []
        }
    }
    getAllAreas() {
        axios({method: 'get', url: `${process.env.REACT_APP_API_URL}/areas`})
        .then((response) => {
            this.setState({allAreas: response.data})
        })
        .catch((err) => {
            //this.props.history.push('/users/login')
        })
    }
    componentDidMount() {
        this.getAllAreas()
    }
    render() {
        return (
            <Container>
                <Section>
                <h1 className="title is-3">{this.props.title}</h1>
                    <div className="columns">
                        {this.state.allAreas.map((area) => {
                                return <div className="column" key={area._id}>
                                    <Link to={"/areas/details/" + area._id}>
                                        <div
                                            className="card action-card is-flex is-shadowless"
                                            style={{
                                            backgroundImage: 'url(' + area.img[0] + ')',
                                            justifyContent: 'center'
                                        }}>
                                            <div className="card-content action-card-content">
                                                <div
                                                    className="content is-flex"
                                                    style={{
                                                    height: "45px"
                                                }}>
                                                    <h3 className="title has-text-light">{area.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            })}
                    </div>
                </Section>
            </Container>
        )
    }
}

export const ListAreas = function (props) {
    return (
        <Container>
                <Section>
                <h1 className="title is-3">{props.title} <span className="is-lowercase">{props.activity.name}</span> </h1>
                <div className="columns is-multiline">
                    {props.areas.map((area) => {
                        return <div className="column" key={area._id}>
                                    <Link to={"/areas/details/" + area._id}>
                                        <div
                                            className="card action-card is-flex is-shadowless"
                                            style={{
                                            backgroundImage: 'url(' + area.img[0] + ')',
                                            justifyContent: 'center'
                                        }}>
                                            <div className="card-content action-card-content">
                                                <div
                                                    className="content is-flex"
                                                    style={{
                                                    height: "45px"
                                                }}>
                                                    <h3 className="title has-text-light">{area.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        })}
                </div>
                </Section>
            </Container>
    )
}


export const AboutArea = function (props) {
    const area = props.area ? props.area: []
    const allActivities = props.allActivities ? props.allActivities: []
    return (
        <Container>
            <Section>
            <h1 className="title is-3">
                <span
                    style={{
                    textDecoration: 'none'
                }}>
                {area.name}
                </span>
            </h1>
            <div className="columns">

                <div className="column is-two-fifths" style={{marginRight:"20px"}}>
                <div 
                    className="about-area-card" 
                    style={{ 'borderRadius': '2px', backgroundImage: 'url('+area.img[0]+')' }} 
                    alt="area-img" >
                </div>
                    
                </div>

                <div className="column">
                    <div
                        className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
                        <div className="column is-custom-icon">
                            <FontAwesomeIcon icon="info" style={{marginLeft:"6px"}}/>
                        </div>
                        <div className="column ">
                            <p className="subtitle is-5">
                            {area.description}
                            </p>
                        </div>
                    </div>
                    <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
                        <div className="column is-custom-icon">
                            <FontAwesomeIcon icon="mountain"/>
                        </div>
                        <div className="column">
                            <ul>
                                {allActivities
                                    .map((activity) => {
                                        return <li className="subtitle is-5 is-marginless" key={activity._id}>
                                             {activity.name}</li>
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    </Container>
    )
}