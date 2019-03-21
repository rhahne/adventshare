import React from 'react'
import { Link } from "react-router-dom";

const ListHousing = function (props) {
  return (
        <div className="columns is-multiline">
            {props.housing.map((housing) => {
                return <div className="column is-4" key={housing._id}>
                        <Link to={"/housings/" + housing._id}>
                            <img style={{ 'borderRadius': '2px' }} src={housing.img[0]} alt="" />
                            <small className="is-size-7 has-text-grey is-uppercase has-text-weight-bold">
                                {housing.address.city}, {housing.address.country} - {housing.area[0]} </small>
                            <p style={{ "margin": "0px" }} className="title is-5 is-capitalized">
                                {housing.title}
                            </p>
                            <p className="has-text-dark">
                                {"€" + housing.pricing + " per night"}
                            </p>
                        </Link>
                    </div>
                })}
        </div>
  )
}

export default ListHousing;