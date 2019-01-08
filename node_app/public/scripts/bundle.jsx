import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CasaRootContainer from '../../views/casaroot.jsx';
import {
  initialState,
  ADD_INCIDENT,
  DELETE_INCIDENT,
  SET_INCIDENTS,
  ADD_MESSAGE,
  SET_CALLBAR_VISIBLE,
  SET_MERGING_INCIDENTS,
  UPDATE_CURRENT_INCIDENT,
} from './state';

// Create new state with one incident added. Is there a better way to do this?
function addIncident(state, incident) {
  const { incidents: oldIncidents } = state;
  const incidents = [...oldIncidents, incident];
  return { ...state, incidents, activeIncident: incident };
}

function incidentUpdate(state, newIncident) {
  const { incidents: oldIncidents } = state;
  let incident = newIncident;
  if (oldIncidents && oldIncidents.length > 0) {
    const prevIncident = oldIncidents[oldIncidents.length - 1];
    incident = { ...prevIncident, ...newIncident };
  }
  const incidents = [...oldIncidents.slice(0, -1), incident];
  return { ...state, incidents, activeIncident: incident };
}

function deleteIncident(state, incidentId) {
  const { incidents: oldIncidents } = state;
  const incidents = oldIncidents.filter(inc => inc.ID !== incidentId);
  return { ...state, incidents };
}

// The reducer manipulates the store state according to the actions that are
// dispatched by the react components. In most cases, this is a straightforward
// update of the state with the payload from the action.
const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INCIDENT:
      return addIncident(state, action.incident);
    case DELETE_INCIDENT:
      return deleteIncident(state, action.incidentId);
    case SET_INCIDENTS:
      return {
        ...state,
        incidents: action.incidents,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case SET_CALLBAR_VISIBLE:
      return {
        ...state,
        callBarVisible: action.callBarVisible,
      };
    case SET_MERGING_INCIDENTS:
      return {
        ...state,
        mergingIncidents: action.merging,
      };
    case UPDATE_CURRENT_INCIDENT:
      return incidentUpdate(state, action.incident);
    default:
      return state;
  }
};

// We use thunk for asynchronous actions
const middleware = [thunk];

// Set up the redux store, which is used for global state management.
const store = createStore(
  baseReducer,
  applyMiddleware(...middleware),
);

ReactDOM.render(<Provider store={store}><CasaRootContainer /></Provider>, document.getElementById('root'));
