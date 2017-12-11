import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import store from '../store';
import {addNewStudentToServer, deleteStudentFromDb, fetchStudents} from '../reducers';

function AllStudents (props) {

  //deconstruct campuses and students from props to use throughout this component
  const {students, campuses} = props;

  return (
    <div className="all-students">
      <div className="all-students-header">
        <h1 className="header-text">All Students</h1>
        <a id="add-new-student" onClick={addNewStudent}>+New Student</a>
      </div>

      {/* Add student pane is initially hidden. When a user clicks the '+New Student' button (displayed above), the add-student-pane node is displayed, allowing users to create a new student instance */}
      <div id="add-student-pane">
      <h2 className="header-text">Add New Student</h2>

        {/* On submit - call the submitHander, which posts our new student to the Db via axios and will re-render the current page by dispatching the new entry to state. */}
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

      {/* By default, render all students currently in our state on the all students page */}
      <table id="all-students-table">
        <tr id="all-students-table-header">
          <th className="student-table-header-center">Student ID</th>
          <th className="student-table-header">Full Name</th>
          <th className="student-table-header">Campus</th>
          <th className="student-table-header-center">Remove Student</th>
        </tr>
        {students.map(student => (
          <tr className="student-listing" key={student.id}>
            <td className="student-listing-item-center">{student.id}</td>
            <td className="student-listing-item"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
            <td className="student-listing-item"><Link to={`/campuses/${student.Campus.id}`}>{student.Campus && student.Campus.name}</Link></td>
            <td className="student-listing-item-center">
              {/* Allow users to delete students from the all students page - removeStudent function is called when clicked */}
              <button className = "remove-student" value={student.id} onClick={removeStudent}>X</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

/* Visibility contorl - add-student-pane is only visible when users click the +New Student button */
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

/* Submit handler for new student submission - posts the user specified student information to the database via axios, dispatches the new student to our state, resets the form and then hides the add-student-pane. */
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
    store.dispatch(fetchStudents());
    document.getElementById('student-input').reset();
    addNewStudent();
  });
}

/* By clicking the remove student option, the specific student is removed from the database via axios. The state is then updated by dispatching the deleted stduent to state. */
function removeStudent(event) {
  event.preventDefault();

  let studentId = parseInt(event.target.value) ;

  axios.delete(`/api/student/${studentId}`, {
      studentId: studentId
  })
  .then(() => store.dispatch(deleteStudentFromDb(studentId)));

}

/* React-Reduc configuration */
const mapStateToProps = function(state) {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatch = {addNewStudentToServer}

const AllStudentsContainer = connect(mapStateToProps, mapDispatch)(AllStudents);

export default AllStudentsContainer;
