import React, { Component } from 'react'
import axios from 'axios'
import { Container, Section } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AboutArea, TopAreas } from '../general/AreaComps'
import ListActivity from '../general/ActivityComps'
import DayPicker from 'react-day-picker';
import moment from 'moment';
import ListHousing from '../general/HousingComps'
import 'react-day-picker/lib/style.css';
import Loader from '../Loader';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';

export default class HousingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      hoverRange: undefined,
      selectedDays: this.getWeekDays(this.getWeekRange(new Date()).from),
      selectedHousing: [],
      selectedArea: [],
      bookingData: '',
      interested: false,
      otherHousesInArea: [],
      currentUserId: this.props.currentUserId,
      numberOfInterests: 0,
      date: this.getWeekNumber(new Date()),
      myDays: [],
      bookedDays: [],
      interestedDays: [],
      currentImage: 0
    }
    this.showInterest = this.showInterest.bind(this)
    this.deleteInterest = this.deleteInterest.bind(this)
    this.isUserInterested = this.isUserInterested.bind(this)
    this.getSelectedHousing = this.getSelectedHousing.bind(this)
    this.getBookingData = this.getBookingData.bind(this)
    this.getOtherHousesInArea = this.getOtherHousesInArea.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  // *** COMPONENT FUNCTIONS *** //
  componentDidMount() {
    let parts = window.location.pathname.split('/');
    let housingId = parts.pop();
    this.getSelectedHousing(housingId)
  }
  componentWillUpdate(prevProps, prevState) {
    if (prevState.selectedHousing._id !== window.location.pathname.split('/').pop()) {
      this.getSelectedHousing(window.location.pathname.split('/').pop())
      window.scrollTo(0, 0)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.getBookingData();
    }
  }

  // *** CALENDAR *** //
  getWeekDays(weekStart) {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(
        moment(weekStart)
          .add(i, 'days')
          .toDate()
      );
    }
    return days;
  }
  getWeekRange(date) {
    return {
      from: moment(date)
        .startOf('week')
        .toDate(),
      to: moment(date)
        .endOf('week')
        .toDate(),
    };
  }
  getWeekNumber(date) {
    return moment(date).week();
  }
  getCurrentWeekNumber() {
    let today = moment(new Date());
    let weekNumber = moment(today).week();
    return weekNumber;
  }
  handleDayChange = date => {
    this.setState({
      selectedDays: this.getWeekDays(this.getWeekRange(date).from),
      date: this.getWeekNumber(date)
    }, () => {
      this.getBookingData();
    })
  };
  handleDayEnter = date => {
    this.setState({
      hoverRange: this.getWeekRange(date),
    });
  };
  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };
  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      selectedDays: days,
      date: weekNumber
    }, () => {
      this.getBookingData();
    })
  };


  // *** LIGHTBOX *** //
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }


  // *** GET BACKEND DATA *** //
  getSelectedHousing(housingId) {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/` + housingId,
      withCredentials: true
    })
      .then((response) => {
        this.setState({
          selectedHousing: response.data,
          selectedArea: response.data.area,
          allActivities: [...response.data.area.activity],
          fiveAreaActivities: response.data.area.activity.splice(response.data.area.activity.length - 5, 5)
        })
        this.getBookingData()
        this.getCalenderInfo()
      })
  }
  getBookingData() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/booking`,
      withCredentials: true,
      params: {
        housing: this.state.selectedHousing._id,
        date: this.state.date
      }
    })
      .then((response) => {
        if (response.data === null) {
          this.setState({
            bookingData: '',
            numberOfInterests: 0,
            interested: false
          })
        } else {
          this.setState({
            bookingData: response.data,
            numberOfInterests: response.data.users.length
          })
          this.isUserInterested(response.data.users)
        }
      })
  }
  getCalenderInfo() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/calendarInfo`,
      withCredentials: true,
      params: {
        housing: this.state.selectedHousing._id
      }
    })
    .then((response) => {
        const {myDays, bookedDays, interestedDays} = response.data
        let allMyDays = []
        let allBookedDays = [];
        let allInterestedDays = [];
        myDays.forEach(myDay => {
          allMyDays.push(new Date(myDay))
        })
        bookedDays.forEach(bookedDay => {
          allBookedDays.push(new Date(bookedDay))
        })
        interestedDays.forEach(interestedDay => {
          allInterestedDays.push(new Date(interestedDay))
        })
        this.setState({
            myDays: allMyDays,
            bookedDays: allBookedDays,
            interestedDays: allInterestedDays
          })
        this.getOtherHousesInArea()
      })
  }
  getOtherHousesInArea() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/inarea`,
      params: {
        areaId: this.state.selectedHousing.area._id,
        houseId: this.state.selectedHousing._id
      }
      })
      .then((response) => {
        let housesInSameArea = response.data
        this.setState({
          otherHousesInArea: housesInSameArea.slice(housesInSameArea.length - 8, housesInSameArea.length),
          loading: false
        })
    })
  }


  // *** BOOKING HANDLER **/
  showInterest() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/showInterest`,
      withCredentials: true,
      params: {
        housingId: this.state.selectedHousing._id,
        date: this.state.date,
        beds: this.state.selectedHousing.beds
      }
    })
      .then((response) => {
        this.isUserInterested(response.data.users)
        this.getCalenderInfo()
      })
  }
  deleteInterest() {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/housings/deleteInterest`,
      withCredentials: true,
      params: {
        housingId: this.state.selectedHousing._id,
        date: this.state.date
      }
    })
      .then((response) => {
        this.setState({
          interested: false
        })
        this.isUserInterested(response.data.users)
        this.getCalenderInfo()
      })
  }
  isUserInterested(allInterests) {
    allInterests.forEach((interestId) => {
      let interested = false;
      if (interestId === this.props.currentUserId._id) {
        interested = true
      }
      this.setState({
        interested: interested,
      })
    })
    this.setState({
      numberOfInterests: allInterests.length
    })
  }


  render() {
    const housing = this.state.selectedHousing
    const area = this.state.selectedArea
    const activities = this.state.fiveAreaActivities
    const allActivities = this.state.allActivities
    const { hoverRange, selectedDays } = this.state;
    const otherHousesInArea = this.state.otherHousesInArea;
    const daysAreSelected = selectedDays.length > 0;
    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
      booked: this.state.bookedDays,
      interests: this.state.interestedDays,
      myDays: this.state.myDays
    };
    const photos = []
    if(housing.img){
      housing.img.forEach(image => {
        photos.push({src: image, width: 4, height: 3})
      })
    } 
    let button = ''
    let info = ''
    if (this.state.bookingData.booked) {
      button = <button className="button is-success">
            Booked
                    <span className="icon is-small" style={{ marginLeft: "7px" }}>
              <FontAwesomeIcon icon="check-circle" />
            </span>
          </button>
      if(this.props.isAuthenticated) info = 'You booked this place!'
    } else if (this.state.bookingData.full) {
      button = <button className="button is-primary">
            Reserved
                    <span className="icon is-small" style={{ marginLeft: "7px" }}>
              <FontAwesomeIcon icon="check-circle" />
            </span>
          </button>
          if(this.props.isAuthenticated) info = 'You reserved this place!'
    } else {
      if (this.state.interested) {
        button = <div
          className="button is-primary has-icon-right"
          onClick={this.deleteInterest}>
          Interested
                      <span className="icon is-small" style={{ marginLeft: "7px" }}>
            <FontAwesomeIcon icon="check-circle" />
          </span>
        </div>
        if(this.props.isAuthenticated) info = 'You are interested in this place!'
      } else {
        if (this.props.isAuthenticated) {
          button = <button className="button is-info" onClick={this.showInterest}>
            Show Interest
                    <span className="icon is-small" style={{ marginLeft: "7px" }}>
              <FontAwesomeIcon icon="heart" />
            </span>
          </button>
        } else {
          button = <button className="button is-info" onClick={() => { this.props.toggleModal('login') }}>
            Show Interest
                    <span className="icon is-small" style={{ marginLeft: "7px" }}>
              <FontAwesomeIcon icon="heart" />
            </span>
          </button>
        }
      }
    }
    return (
      <div>
        {this.state.loading && <Loader /> }
        {housing.title ?
          <div>
            <div className="imageBox" style={{ backgroundImage: 'url(' + housing.img[0] + ')' }}>
            </div>
            <Container>
              <Section>
                <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
                  <div className="column is-7">
                    <h1 className="title is-2">
                      {housing.title}
                    </h1>
                    <div className="columns">
                      <div className="column is-custom-icon">
                        <FontAwesomeIcon icon="location-arrow" />
                      </div>
                      <div className="column">
                        <p className="subtitle is-5">
                          {housing.address.city} - {housing.address.country}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="columns">
                      <div className="column is-custom-icon">
                        <FontAwesomeIcon icon="info" />
                      </div>
                      <div className="column">
                        <p className="subtitle is-5">
                          {housing.description}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="columns">
                      <div className="column is-custom-icon">
                        <FontAwesomeIcon icon="bed" />
                      </div>
                      <div className="column">
                        <p className="subtitle is-5">
                          {housing.beds} beds
                      </p>
                      </div>
                      </div>

                      <hr />
                      <Gallery photos={photos} onClick={this.openLightbox} columns={2}/>
                      <Lightbox images={photos}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                        backdropClosesModal={true}
                        showThumbnails={true}
                      />
                      {/* <hr />

                      <div className="columns is-variable is-2">
                        <div className="column">

                              <iframe scrolling={"no"}
                                marginHeight={"0"} marginWidth={"0"} src={"https://maps.google.com/maps?q=" +
                                housing.address.city + "&t=&z=9&ie=UTF8&iwloc=&output=embed" }>
                              </iframe>
                            
                        </div>
                      </div> */}
                    </div>
                  <div className="column">
                  </div>
                  <div className="column is-4" >
                    <div className="booking-box">
                      <p className="subtitle is-5 price">
                        <div style={{ marginBottom: "7px" }}>
                          <strong className="title is-4">{"€"}{housing.pricing}</strong> {" per week"}
                        </div>
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                      </p>
                      <hr />
                      <p className="subtitle is-5">
                        Traveldates:
                    </p>
                      <div className="selectedWeek">
                        <DayPicker 
                        selectedDays={selectedDays} 
                        showWeekNumbers showOutsideDays 
                        modifiers={modifiers} 
                          onDayClick={this.handleDayChange} 
                          onDayMouseEnter={this.handleDayEnter}
                          onDayMouseLeave={this.handleDayLeave} 
                          onWeekClick={this.handleWeekClick} 
                          month={new Date(2019, 3)}
                          />
                        {selectedDays.length === 7 && (
                          <div>
                            {moment(selectedDays[0]).format('LL')} –{' '}
                            {moment(selectedDays[6]).format('LL')}
                          </div>
                        )}
                      </div>
                      <hr />
                      {button}
                      {info !== '' ? 
                      <>
                      <br /><br />
                      <strong>{info}</strong>
                      </>
                      :''}
                      <hr />
                      <strong> {this.state.numberOfInterests} / {housing.beds} Interested Adventsharers:</strong>
                      <br /><br />
                    </div>
                  </div>
                </div>
              </Section>
            </Container>
          </div>
          : ''}
        <hr className="hr" />

        {area.name ?
          <AboutArea area={area} allActivities={allActivities} /> : ''
        }
        <hr className="hr" />

        {activities ?
          <ListActivity activity={activities} title={"Best area activities"} /> : ""}
        <hr className="hr" />

        {otherHousesInArea ? 
        <ListHousing housing={otherHousesInArea} title={"Similar houses in the " + area.name}/> : ''
        }
        <hr className="hr" />
        <TopAreas title={"Other top areas"} />
      </div>
    )
  }
}

