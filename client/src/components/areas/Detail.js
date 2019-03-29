import React, { Component } from 'react'
import axios from 'axios'
import ListHousing from '../general/HousingComps'
import { AboutArea } from '../general/AreaComps'
import Loader from '../Loader';
import ListActivity from '../general/ActivityComps';

export default class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      selectedArea: [],
      activities: [],
      housing: [],
      topActivities: []
    }
  }

  getSelectedArea(areaId) {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/areas/details/` + areaId
    })
      .then((response) => {
        const { area, housingsInArea } = response.data;
        let allActivities = [...response.data.area.activity]
        this.setState({
          selectedArea: area,
          housing: housingsInArea,
          activities: area.activity,
          loading: false,
          topActivities: allActivities.slice(allActivities.length - 5, allActivities.length)
        })
      })
      .catch((err) => {
        //this.props.history.push('/users/login')
      })
  }

  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let areaId = parts.pop();
    this.getSelectedArea(areaId)
  }

  render() {
    return (
      <div>
          {this.state.loading && <Loader /> }

          {this.state.selectedArea.name ? 
          <div className="hero heroBgImage" style={{ backgroundImage: 'url(' + this.state.selectedArea.img[1] + ')' }}>
              <h1 class="is-1 title heroing" style={{color:'white'}}>
                {this.state.selectedArea.name}
              </h1>
          </div>
          : ''}

          {this.state.selectedArea.name ?
            <AboutArea area={this.state.selectedArea} allActivities={this.state.activities} /> : ''
          }
          {this.state.topActivities? 
          <ListActivity activity={this.state.topActivities} title={"Top activities in the " + this.state.selectedArea.name}/>
          : '' 
          }

          <ListHousing housing={this.state.housing} title={"Housing in " + this.state.selectedArea.name}/>
        </div>
    )
  }
}