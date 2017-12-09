import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import store from '../store';
import {addNewStudentToServer, deleteStudentFromDb} from '../reducers';

function AllStudents (props) {
  const {students, campuses} = props;
  console.log('campuses ', campuses);
  console.log('students ', students);

  return (
    <div className="all-students">
    <div className="all-students-header">
      <h1 className="header-text">All Students</h1>
      <a id="add-new-student" onClick={addNewStudent}>+New Student</a>
    </div>
    <div id="add-student-pane">
    <h2 className="header-text">Add New Student</h2>
     <form id="student-input" onSubmit={submitHandler}>
      <div>
        <label>First Name</label>
        <input name="firstName" />
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" />
      </div>
      <div>
        <label>Campus</label>
        <select name="campus">
          {
            campuses.map(campus => (
              <option key={campus.id} value={campus.id}>{campus.name}</option>
            ))
          }
        </select>
        <button>Submit</button>
      </div>
     </form>
    </div>
    <table id="all-students-table">
      <tr id="all-students-table-header">
        <th className="student-table-header">Student ID</th>
        <th className="student-table-header">Full Name</th>
        <th className="student-table-header">Campus</th>
        <th className="student-table-header">Remove Student</th>
      </tr>
      {students.map(student => (
        <tr className="student-listing" key={student.id}>
          <td className="student-listing-item-center">{student.id}</td>
          <td className="student-listing-item"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
          <td className="student-listing-item">{campuses.filter(campus =>
            campus.id === student.CampusId)[0].name}</td>
          <td className = "remove-student"><button value={student.id} onClick={removeStudent}>X</button></td>
        </tr>
      ))}
    </table>
  </div>
  )
}

function addNewStudent() {
  var element = document.getElementById("add-student-pane")

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

  let firstName = event.target.firstName.value;
  let lastName = event.target.lastName.value;
  let campus = event.target.campus.value;

  axios.post('/api/student', {
    firstName: firstName,
    lastName: lastName,
    gpa: 0.0,
    CampusId: campus
  })
  .then(res => res.data)
  .then(student => {
    store.dispatch(addNewStudentToServer(student));
    document.getElementById('student-input').reset();
  });
}

function removeStudent(event) {
  event.preventDefault();

  let studentId = parseInt(event.target.value) ;

  axios.delete(`/api/student/${studentId}`, {
      studentId: studentId
  })
  .then(() => store.dispatch(deleteStudentFromDb(studentId)));

}

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatch = {addNewStudentToServer}

const AllStudentsContainer = connect(mapStateToProps, mapDispatch)(AllStudents);

export default AllStudentsContainer;
