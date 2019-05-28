import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollPanel } from 'primereact/scrollpanel';
import Slider from 'react-slick';
import socketIOClient from 'socket.io-client';
import { Howl } from 'howler';
import { connect } from 'react-redux';
import {
  geocoding,
  geoCodeToIncident,
  test,
} from '../public/scripts/geocode.js';
import {
  nearby,
  updateIncidentWithNluResults,
  mergeIncidents,
  updateIncidentInDb,
  parseIncidentFromDb,
} from '../public/scripts/incidents.js';
import { enrichEntities } from '../public/scripts/entities.js';
import IncidentsContainer from './incidents.jsx';
// import Transcript from './transcript.jsx';
import Chat from './chat.jsx';
import CallBar, { finishedState, activeState } from './callbar.jsx';
import {
  SET_INCIDENTS,
  ADD_INCIDENT,
  DELETE_INCIDENT,
  UPDATE_CURRENT_INCIDENT,
  ADD_MESSAGE,
  SET_CALLBAR_VISIBLE,
  SET_MERGING_INCIDENTS,
} from '../public/scripts/state.js';
import NavBar from './navbar.jsx';
import Map from './maps.jsx';


const uri = window.location.host.includes('localhost') ? 'http://localhost:3000' : `https://${window.location.host}`;
const socket = socketIOClient(uri);

class CasaRoot extends Component {
  static handleGeoTest() {
    test();
  }

  static formatTime(date) {
    const hours = date.getHours();
    const min = date.getMinutes();
    const minPadding = (min < 10) ? '0' : '';
    const amPm = (hours > 11) ? 'pm' : 'am';
    return `${hours}:${minPadding}${min} ${amPm}`;
  }

  constructor() {
    super();
    this.state = { activeTab: 0 };
    this.sliderRef = React.createRef();
    this.pos = '-76.807521,39.275670';
    // Create a reference to the transcript component so we can call
    // methods on that component.
    this.transcript = React.createRef();
    this.callBar = React.createRef();
    this.handleStartClick = this.handleStartClick.bind(this);
    this.navigateSliderTo = this.navigateSliderTo.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.mergeAccept = this.mergeAccept.bind(this);
    this.mergeReject = this.mergeReject.bind(this);
    this.resetDemo = this.resetDemo.bind(this);
  }

  componentDidMount() {
    const { getIncidentsFromDB } = this.props;
    getIncidentsFromDB();

    socket.on('transcription', (msg) => {
      // store new transcript information
      const { speaker, text, id } = msg;
      const { addMessage } = this.props;
      const complete = {
        speaker, text, isComplete: true, id,
      };
      addMessage(complete);
      // Due to our idiotic message passing to the transcript, we need to
      // reset a complete message in the redux store. Otherwise the same
      // message gets added again and again when the component renders (on
      // tab navigation, for example).
      addMessage({ speaker: '' });
    });

    socket.on('interim', (msg) => {
      const { text, speaker } = msg;
      const { addMessage } = this.props;
      const interim = {
        speaker, text, isComplete: false, id: -1,
      };
      addMessage(interim);
    });

    socket.on('nlu', (msg) => {
      const { id, text, entities } = msg;
      if (entities.length > 0) {
        const enrichedEntities = enrichEntities(entities, text);
        console.log(enrichedEntities);
        this.nluFormatMessage(id, enrichedEntities, text);
        const { activeIncident, updateCurrentIncident, mergingIncidents } = this.props;
        const incident = updateIncidentWithNluResults(activeIncident, enrichedEntities);

        if (incident.ID) {
          updateIncidentInDb(incident)
            .then(() => console.log(`Updated incident ${incident.ID}`))
            .catch(err => console.log(`Error: ${err}`));
        } else if (incident.ADDRESS_STREET && !mergingIncidents) {
          const { incidents, setIncidents, setMergingIncidents } = this.props;
          const mergeIndex = incidents.slice(0, -1).findIndex(x => nearby(x, incident));
          if (mergeIndex >= 0) {
            setIncidents([
              ...incidents.slice(0, mergeIndex),
              ...incidents.slice(mergeIndex + 1, -1),
              { ...incidents[mergeIndex], mergeProposed: true },
              incident,
            ]);
            // mark as merging so that we don't propose this merge a second time
            setMergingIncidents(true);
            this.geocodeIncident(incident);
          } else { // no merge candidate found
            this.writeActiveIncidentToDb(incident);
          }
        }
        updateCurrentIncident(incident);
      }
    });

    socket.on('disconnect', (msg) => {
      console.log(`Web socket disconnected, reason: ${msg}`);
      socket.close();
    });
  }

  setActiveTab(i) {
    this.setState({ activeTab: i });
  }

  navigateSliderTo(i) {
    this.setActiveTab(i);
    this.sliderRef.current.slickGoTo(i);
  }

  mergeAccept() {
    const {
      incidents,
      activeIncident,
      setMergingIncidents,
      deleteIncident,
      updateCurrentIncident,
    } = this.props;
    setMergingIncidents(false);
    const mergeCandidate = incidents.slice(-2, -1)[0];
    const merged = mergeIncidents(activeIncident, mergeCandidate);
    // after merging, delete mergeCandidate, keep current incident
    deleteIncident(mergeCandidate.ID);
    updateIncidentInDb(merged)
      .then(() => console.log(`Merged with incident ${mergeCandidate.ID}!`))
      .catch(err => console.log(err));
    updateCurrentIncident(merged);
  }

  mergeReject() {
    const { setMergingIncidents, updateCurrentIncident, activeIncident } = this.props;
    setMergingIncidents(false);
    console.log('Merge rejected by user.');
    const incident = { ...activeIncident, mergeProposed: false };
    // TODO put incident back to previous position
    updateCurrentIncident(incident);
    this.writeActiveIncidentToDb(incident);
  }

  geocodeIncident(incident, callback = Function.prototype) {
    const { updateCurrentIncident } = this.props;
    return geocoding(
      `${incident.ADDRESS_STREET_NB} ${incident.ADDRESS_STREET}`,
      this.pos,
      (r) => {
        const inc = { ...incident, ...geoCodeToIncident(r) };
        updateCurrentIncident(inc);
        callback(inc);
      },
    );
  }

  writeActiveIncidentToDb(incident) {
    const { updateCurrentIncident } = this.props;
    console.log('writing new incident to db');
    this.geocodeIncident(incident, (updatedIncident) => {
      fetch('/incident', {
        method: 'POST',
        body: JSON.stringify(updatedIncident),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((newIncident) => {
          updateCurrentIncident(parseIncidentFromDb(newIncident));
        });
    });
  }

  clearTranscript() {
    // We call a method on the transcript component ref. Since the transcript
    // is actually a redux container wrapper, we need to access the wrapped,
    // actual rendering component to call the method. Ugh.
    this.transcript.current.getWrappedInstance().clear();
  }

  nluFormatMessage(id, entities, text) {
    if (entities && entities.length > 0) {
      this.transcript.current.getWrappedInstance().updateMessageById(id, text, entities);
    }
  }

  handleStartClick(callId, number, index) {
    const timestamp = CasaRoot.formatTime(new Date());
    this.transcript.current.getWrappedInstance()
      .setTime(timestamp);
    const call = { TIME: timestamp, PHONE_NUMBER: number };
    this.callBar.current.getWrappedInstance()
      .updateCallProperties(index, { state: activeState });
    this.callBar.current.getWrappedInstance().setCallIsActive(true);
    const { createNewIncident, addMessage } = this.props;
    createNewIncident(call);
    addMessage({
      speaker: '', text: '', isComplete: true, id: -1,
    });
    this.clearTranscript();
    const file1 = `./public/audio/call${callId}_dispatcher.raw`;
    const file2 = `./public/audio/call${callId}_caller.raw`;
    const headers = { 'Content-Type': 'application/json' };
    fetch('/recognize?id=u1', {
      method: 'POST',
      headers,
      body: JSON.stringify({ filename: file1 }),
    });
    fetch('/recognize?id=u2', {
      method: 'POST',
      headers,
      body: JSON.stringify({ filename: file2 }),
    });
    const sound = new Howl({ src: [`/audio/call${callId}.flac`] });
    sound.play();
    sound.on('end', () => {
      this.callBar.current.getWrappedInstance()
        .updateCallProperties(index, { state: finishedState });
      this.callBar.current.getWrappedInstance()
        .setCallIsActive(false);
    });
  }

  resetDemo() {
    fetch('/resetdb')
      .then(res => res.text)
      .then(() => {});
    const { getIncidentsFromDB } = this.props;
    getIncidentsFromDB();
  }

  render() {
    const settings = {
      className: 'slider variable-width',
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      variableWidth: true,
    };
    const { activeTab } = this.state;
    return (
      <div>
        <div className="headerBar">
          <img src="images/siren.svg" alt="" />
          <span className="left">AImergency Control Room</span>
          <span className="right">Dana ☰</span>
        </div>
        <NavBar
          names={['Incoming Calls', 'Transcript', 'Incidents', 'Map']}
          activeIndex={activeTab}
          onClick={this.navigateSliderTo}
        />
        <div className="contentContainer">
          <Slider {...settings} ref={this.sliderRef} afterChange={i => this.setActiveTab(i)}>
            <CallBar ref={this.callBar} onClick={this.handleStartClick}>
              <button className="demoButton" type="button" onClick={() => this.resetDemo()}>Reset Demo Database</button>
            </CallBar>
            <Chat ref={this.transcript} />
            <div style={{ width: '380px' }}>
              <ScrollPanel style={{ width: '100%', height: '800px' }}>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <IncidentsContainer
                  onMergeAccept={this.mergeAccept}
                  onMergeReject={this.mergeReject}
                />
              </ScrollPanel>
            </div>
            <div className="ui-g-5">
              <Map />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

CasaRoot.propTypes = {
  getIncidentsFromDB: PropTypes.func.isRequired,
  setIncidents: PropTypes.func.isRequired,
  deleteIncident: PropTypes.func.isRequired,
  updateCurrentIncident: PropTypes.func.isRequired,
  activeIncident: PropTypes.shape.isRequired,
  incidents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addMessage: PropTypes.func.isRequired,
  setCallBarVisible: PropTypes.func.isRequired,
  createNewIncident: PropTypes.func.isRequired,
};

// Redux based state management below. Create a container component.

// Load incidents from the DB and add them to the store.
const getIncidentsFromDB = () => dispatch => (
  fetch('/incidents')
    .then(res => res.json())
    .then((incidents) => {
      dispatch({
        type: SET_INCIDENTS,
        incidents: parseIncidentFromDb(incidents),
      });
    })
);

const setIncidents = incidents => dispatch => (
  dispatch({ type: SET_INCIDENTS, incidents })
);

const deleteIncident = incidentId => dispatch => (
  dispatch({ type: DELETE_INCIDENT, incidentId })
);

const updateCurrentIncident = incident => dispatch => (
  dispatch({ type: UPDATE_CURRENT_INCIDENT, incident })
);

// Add a new message to the store
const addMessage = message => dispatch => (
  dispatch({ type: ADD_MESSAGE, message })
);

// Set call bar visibility
const setCallBarVisible = isVisible => dispatch => (
  dispatch({ type: SET_CALLBAR_VISIBLE, callBarVisible: isVisible })
);

const setMergingIncidents = merging => dispatch => (
  dispatch({ type: SET_MERGING_INCIDENTS, merging })
);

const createNewIncident = call => dispatch => (
  dispatch({ type: ADD_INCIDENT, incident: { calls: [call] } })
);

// Pass the entire store for now. All it really needs are the incident actions.
// Make this more focused later.
const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = {
  deleteIncident,
  updateCurrentIncident,
  getIncidentsFromDB,
  setIncidents,
  addMessage,
  setCallBarVisible,
  setMergingIncidents,
  createNewIncident,
};

const CasaRootContainer = connect(mapStateToProps, mapDispatchToProps)(CasaRoot);
export default CasaRootContainer;
