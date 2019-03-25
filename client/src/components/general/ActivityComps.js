import React from 'react'
import {Link} from "react-router-dom";

const ListActivity = function (props) {
    return (
        <div className="columns">
            {props
                .activity
                .map((activity) => {
                    return <div className="column" key={activity._id}>
                        <Link to={"/activity/" + activity._id}>
                            {activity
                                .img
                                .map((img) => {
                                    return <div
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
    )
}

export default ListActivity