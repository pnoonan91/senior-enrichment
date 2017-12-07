/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios';

const initialState = {
  campuses: []
}


/*-------------------- ACTION TYPES --------------------*/
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';


/*-------------------- ACTION CREATORS --------------------*/
export const gotCampusesFromServer = function(campuses) {
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses: campuses
  };
};

/*-------------------- THUNK CREATORS --------------------*/
export function fetchCampuses(){
  return function(dispatch){
    axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = gotCampusesFromServer(campuses);
        dispatch(action);
      });
  };
}

/*-------------------- REDUCERS --------------------*/
const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return Object.assign({}, state, {campuses: action.campuses})
    default: return state
  }
};

export default rootReducer
