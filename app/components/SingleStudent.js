import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudentInDb, fetchStudents} from '../reducers';
import store from '../store';

function SingleStudent (props) {
  const {students, campuses, allCampuses, currentCampus} = props;
  let campusName = allCampuses.find(campus => campus.id === students.CampusId)
  // console.log('STUDENTS CAMPUS NAME ', campusName.name)

  return(
    <div className="single-student">
      <div className="single-student-header">
        <h1 className="header-text">{students.name}</h1>
        <a id="edit-student" onClick={editStudent}>+Edit Student Info</a>
      </div>
      <div id="edit-student-pane">
        <h2 className="header-text">Edit Student Info</h2>
        <form id="edit-student-input" onSubmit={submitHandler}>
          <div>
            <label>First Name</label>
            <input name="firstName" defaultValue={students.firstName}/>
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" defaultValue={students.lastName}/>
          </div>
          <div>
            <label>GPA</label>
            <input name="gpa" defaultValue={students.gpa}/>
          </div>
          <div>
            <label>Campus</label>
            <select name="campus">
            {
              allCampuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))
            }
            </select>
            <button name="studentId" value={students.id}>Submit</button>
          </div>
        </form>
      </div>
        <a href={"mailto:" + students.email}>{students.email}</a>
        <table className="single-student-table">
          <tr>
            <td>First Name:</td>
            <td>{students.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{students.lastName}</td>
          </tr>
          <tr>
            <td>Campus:</td>
            <td><Link to={`/campuses/${students.CampusId}`}>{students.Campus && students.Campus.name}</Link></td>
          </tr>
          <tr>
              <td>GPA:</td>
              <td>{students.gpa}</td>
            </tr>
        </table>
    </div>
  )
}

function editStudent() {
  var element = document.getElementById("edit-student-pane")

  if(!element.style.display){
    element.style.display = "block";
  }
  else if(element.style.display === "none"){
    element.style.display = "block";
  } else{
    element.style.display = "none";
  }

}

function submitHandler(event) {
  event.preventDefault();

  axios.put(`/api/student/${event.target.studentId.value}`, {
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    gpa: event.target.gpa.value,
    CampusId: event.target.campus.value
  })
    .then(res => res.data)
    .then(student => {

      store.dispatch(fetchStudents())
      document.getElementById('edit-student-input').reset();
    })
}

const mapStateToProps = function (state, ownProps) {
  const studentId = Number(ownProps.match.params.studentId);
  const currentStudent = state.students.find(student => student.id === studentId);
  const allCampuses = state.campuses;
  const currentCampus = state.campuses.find(campus => campus.id === currentStudent.CampusId);

  return {
    students: currentStudent,
    campuses: currentStudent.Campus,
    allCampuses: allCampuses,
    currentCampus: currentCampus
  };
};

const mapDispatch = {updateStudentInDb}

const SingleStudentContainer = connect(mapStateToProps, mapDispatch)(SingleStudent);

export default SingleStudentContainer;
