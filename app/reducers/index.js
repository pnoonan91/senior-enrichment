/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios';

const initialState = {
  campuses: [],
  students: []
}


/*-------------------- ACTION TYPES --------------------*/
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';


/*-------------------- ACTION CREATORS --------------------*/
export const gotCampusesFromServer = function(campuses) {
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses: campuses
  };
};

export const gotStudentsFromServer = function(students) {
  return{
    type: GOT_STUDENTS_FROM_SERVER,
    students: students
  }
}

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

export function fetchStudents(){
  return function(dispatch){
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      const action = gotStudentsFromServer(students);
      dispatch(action);
    });
  }
}

/*-------------------- REDUCERS --------------------*/
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return Object.assign({}, state, {campuses: action.campuses});
    case GOT_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, {students: action.students});
    default: return state;
  }
};

export default rootReducer;
