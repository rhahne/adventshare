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
        axios({method: 'get', url: 'http://localhost:3002/areas'})
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
                        {this
                            .state
                            .allAreas
                            .map((area) => {
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

export const AboutArea = function (props) {
    const area = props.area ? props.area: []
    const allActivities = props.allActivities ? props.allActivities: []
    return (
        <Container>
            <Section>
            <h1 className="title">
                <span
                    style={{
                    textDecoration: 'underline'
                }}>{area.name}</span>
            </h1>
            <div className="columns">
                <div className="column is-one-third">
                    <img src={area.img[0]} alt="area-img"/>
                </div>
                <div className="column">
                    <div
                        className="columns"
                        style={{
                        paddingTop: '20px'
                    }}>
                        <div className="column is-custom-icon">
                            <FontAwesomeIcon icon="info"/>
                        </div>
                        <div className="column">
                            <p>{area.description}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-custom-icon">
                            <FontAwesomeIcon icon="mountain"/>
                        </div>
                        <div className="column">
                            <ul>
                                {allActivities
                                    .map((activity) => {
                                        return <li key={activity._id}>
                                            - {activity.name}</li>
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

/*
export const ListAreas = function (props) {
  return (
    <div className="columns">
    {props.allAreas.map((area) => {
      return<div className="column" key={area._id}>
       <Link to={"/areas/"+area._id}>
        <div className="card area-card" style={{backgroundImage: 'url('+area.img[0]+')'}}>
          <div className="card-content area-card-content">
            <div className="content">
              <h3>{area.name}</h3>
            </div>
          </div>
        </div>
      </Link>
      </div>
    })}
  </div>
  )
}
*/