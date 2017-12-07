import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function AllStudents (props) {
  const {students, campuses} = props;

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
        <input />
      </div>
      <div>
        <label>Last Name</label>
        <input />
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
          <td className="student-listing-item">{student.name}</td>
          <td className="student-listing-item">{student.Campus.name}</td>
          <td className = "remove-student"><Link to="">X</Link></td>
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


}

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const AllStudentsContainer = connect(mapStateToProps)(AllStudents);

export default AllStudentsContainer;
