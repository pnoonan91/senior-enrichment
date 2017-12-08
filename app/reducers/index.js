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
const ADD_NEW_STUDENT = 'ADD_NEW_STUDENT';
const DELETE_STUDENT_FROM_DB = 'DELETE_STUDENT_FROM_DB';
const ADD_NEW_CAMPUS = 'ADD_NEW_CAMPUS';
const DELETE_CAMPUS_FROM_DB = 'DELETE_CAMPUS_FROM_DB';

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

export const addNewStudentToServer = function(student) {
  return{
    type: ADD_NEW_STUDENT,
    student: student
  }
}

export const deleteStudentFromDb = function(studentId) {
  return {
    type: DELETE_STUDENT_FROM_DB,
    studentId: studentId
  }
}

export const addNewCampusToServer = function(campus) {
  return{
    type: ADD_NEW_CAMPUS,
    campus: campus
  }
}

export const deleteCampusFromDb = function(campusId){
  return{
    type: DELETE_CAMPUS_FROM_DB,
    campusId: campusId
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
    case ADD_NEW_STUDENT:
      return Object.assign({}, state, {students: state.students.concat(action.student)});
    case DELETE_STUDENT_FROM_DB:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== action.studentId)});
    case ADD_NEW_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.concat(action.campus)});
    case DELETE_CAMPUS_FROM_DB:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => campus.id !== action.campusId)});
    default: return state;
  }
};

export default rootReducer;
