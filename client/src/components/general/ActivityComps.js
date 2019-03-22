import React from 'react'
import {Link} from "react-router-dom";

const ListActivity = function (props) {
    return (
        <div className="columns">
            {props
                .activity
                .map((activity) => {
                    debugger
                    return <div className="column" key={activity._id}>
                        <Link to={"/activity/" + activity._id}>
                            {activity.map((img) => {
                                return <div
                                    className="card area-card is-flex"
                                    style={{
                                    backgroundImage: 'url(' + img.img[0] + ')',
                                    justifyContent: 'center'
                                }}></div>
                            })}
                            <div className="card-content area-card-content">
                                <div
                                    className="content is-flex"
                                    style={{
                                    height: "45px"
                                }}>
                                    <h3 className="title has-text-light">{activity.name}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                })}
        </div>
    )
}

export default ListActivity