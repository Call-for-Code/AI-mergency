export const initialState = {
  incidents: [],
  activeIncident: {},
  message: {
    speaker: '', text: '', isComplete: true, id: -1,
  },
};

export const ADD_INCIDENT = 'ADD_INCIDENT';
export const DELETE_INCIDENT = 'DELETE_INCIDENT';
export const SET_INCIDENTS = 'SET_INCIDENTS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_CALLBAR_VISIBLE = 'SET_CALLBAR_VISIBLE';
export const SET_MERGING_INCIDENTS = 'SET_MERGING_INCIDENTS';
export const UPDATE_CURRENT_INCIDENT = 'UPDATE_CURRENT_INCIDENT';
