import React from 'react'
import {Link} from "react-router-dom";
import {Container, Section} from 'react-bulma-components'

const ListActivity = function (props) {
    debugger
    return (
<Container>
        <Section>
        <h1 className="title is-3">{props.title}</h1>
            <div className="columns">
                {props
                    .activity
                    .map((activity) => {
                        return <div className="column" key={activity._id}>
                            <Link to={"/activities/details/" + activity._id}>
                                {activity
                                    .img
                                    .map((img) => {
                                        return <div key={img}
                                            className="card action-card is-flex is-shadowless"
                                            style={{
                                            backgroundImage: 'url(' + img + ')',
                                            justifyContent: 'center'
                                        }}>
                                            <div className="card-content action-card-content">
                                                <div
                                                    className="content is-flex"
                                                    style={{
                                                    height: "45px"
                                                }}>
                                                    <h3 className="title has-text-light">{activity.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                            </Link>
                        </div>
                    })}
            </div>
        </Section>
    </Container>
    )
}

export default ListActivity