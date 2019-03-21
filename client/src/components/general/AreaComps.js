import React, { Component } from 'react'
import { Link } from "react-router-dom";

const ListAreas = function (props) {
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

export default ListAreas;