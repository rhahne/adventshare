import React from 'react'
import { Link } from "react-router-dom";
import {Container, Section} from 'react-bulma-components'

const ListHousing = function (props) {
  return (
<Container>
        <Section>
        <h1 className="title is-3">{props.title}</h1>
        <div className="columns is-multiline">
            {props.housing.map((housing) => {
                return <div 
                            className="column is-3" 
                            key={housing._id}>
                        <Link 
                            to={"/housings/" + housing._id}>
                            <div 
                                className="housing-card" 
                                style={{ 'borderRadius': '2px', backgroundImage: 'url('+housing.img[0]+')' }} 
                                alt="" >
                            </div>
                            <small 
                                className="is-size-7 has-text-grey is-uppercase"
                                style={{fontWeight:'750'}}>
                                    {housing.address.city}, {housing.address.country} - {housing.area.name} 
                            </small>
                            <p 
                                style={{ "margin": "0px" }} 
                                className="title is-5 is-capitalized">
                                    {housing.title}
                            </p>
                            <p 
                                className="has-text-dark">
                                    {"€" + housing.pricing + " per night"}
                            </p>
                        </Link>
                    </div>
                })}
        </div>
        </Section>
    </Container>
  )
}

export default ListHousing;