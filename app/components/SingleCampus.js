import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCampuses, fetchStudents, deleteStudentFromDb} from '../reducers';
import store from '../store';

function SingleCampus (props) {
  const { campus, students } = props;

  return (
    <div className="single-campus">
      <div className = "single-campus-header">
        <h1 className="header-text">{campus && campus.name}</h1>
        <a id="edit-campus" onClick={editCampus}>+Edit Campus Info</a>
      </div>
      <div id="edit-campus-pane">
      <h2 className="header-text">Edit Campus Info</h2>
      <form id="edit-campus-input" onSubmit={submitHandler}>
        <div>
          <label>Campus Name</label>
          <input name="campusName" defaultValue={campus && campus.name}/>
        </div>
        <div>
          <label>Description</label>
          <input name="campusDescription" defaultValue={campus && campus.description}/>
        </div>
        <div>
          <label>Image URL</label>
          <input name="imageUrl" defaultValue={campus && campus.imageUrl}/>
        </div>
        <div>
          <button name="campusId" value={campus && campus.id}>Submit</button>
        </div>
      </form>
    </div>
      <h4 className="campus-description-page">{campus && campus.description}</h4>
      <div className="all-students">
      <div className="campus-details-container">
      <button className="add-student-btn" onClick={addStudent}>Add Student to {campus && campus.name}</button>
      <div className="image-container">
        <img className="campus-page-image" src={campus && campus.imageUrl} />
      </div>
      <div id="add-student-pane">
      <h3 className="header-text">Add New Student to Campus!</h3>
       <form id="student-input" onSubmit={studentSubmitHandler}>
        <div>
          <label>First Name</label>
          <input name="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <input name="lastName" />
        </div>
        <div>
          <button name="campus" value={campus && campus.id}>Submit</button>
        </div>
       </form>
      </div>
      <table id="all-students-table-campus">
        <tr id="all-students-table-header">
          <th className="student-table-header">Student ID</th>
          <th className="student-table-header">Full Name</th>
          <th className="student-table-header">Remove Student</th>
        </tr>
        {students && students.map(student => (
          <tr className="student-listing" key={student.id}>
            <td className="student-listing-item-center">{student.id}</td>
            <td className="student-listing-item"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
            <td className="student-listing-item"><button value={student.id} onClick={removeStudent}>X</button></td>
          </tr>
        ))}
      </table>
      </div>
    </div>
    </div>
  );
}

function editCampus() {
  var element = document.getElementById("edit-campus-pane")

  if(!element.style.display){
    element.style.display = "block";
  }
  else if(element.style.display === "none"){
    element.style.display = "block";
  } else{
    element.style.display = "none";
  }

}

function addStudent() {
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

  axios.put(`/api/campus/${event.target.campusId.value}`, {
    name: event.target.campusName.value,
    imageUrl: event.target.imageUrl.value,
    description: event.target.campusDescription.value,
  })
    .then(res => res.data)
    .then(campus => {

      store.dispatch(fetchCampuses());
      document.getElementById('edit-campus-input').reset();
    })
}

function studentSubmitHandler(event) {
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

const mapStateToProps = function (state, ownProps) {
  const campusId = Number(ownProps.match.params.campusId);

  return{
    campus: state.campuses.find(campus => campus.id === campusId),
    students: state.students.filter(student => student.CampusId === campusId)
  }
}

const SingleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default SingleCampusContainer;
