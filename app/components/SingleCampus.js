import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCampuses, fetchStudents, deleteStudentFromDb} from '../reducers';
import store from '../store';

function SingleCampus (props) {

  //deconstruct selected campus & associated students from props to use throughout this component
  const { campus, students } = props;

  return (
    <div className="single-campus">
      <div className = "single-campus-header">
        <h1 className="header-text">{campus && campus.name}</h1>
        <a id="edit-campus" onClick={editCampus}>+Edit Campus Info</a>
      </div>

      {/* Edit campus pane is initially hidden. When a user clicks the '+Edit Campus Info' button (displayed above), the edit-campus-pane node is displayed, allowing users to edit the campus information */}
      <div id="edit-campus-pane">
        <h2 className="header-text">Edit Campus Info</h2>

         {/* On submit - call the submitHander, which edits the campus' information in the DB via axios. Then will re-render the current page by dispatching the updated campus to state. */}
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
          {/* Visibility control - toggles the 'add-student-pane' which adds a student to the campus currently rendered on the page */}
          <button className="add-student-btn" onClick={addStudent}>Add Student to {campus && campus.name}</button>

          <div className="image-container">
            <img className="campus-page-image" src={campus && campus.imageUrl} />
          </div>

          <div id="add-student-pane">
            <h3 className="header-text">Add New Student to Campus!</h3>
            {/* On submit - call the submitHander, which posts our new student to the Db with the correct CampusId via axios and will re-render the current page by dispatching the new entry to state. */}
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

          {/*Display all students currently assigned to the campus being rendered*/}
          <table id="all-students-table-campus">
            <tr id="all-students-table-header">
              <th className="student-table-header">Student ID</th>
              <th className="student-table-header">Full Name</th>
              <th className="student-table-header-center">Remove Student</th>
            </tr>
            {students && students.map(student => (
              <tr className="student-listing" key={student.id}>
                <td className="student-listing-item-center">{student.id}</td>
                <td className="student-listing-item"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
                <td className="student-listing-item-center">
                  {/*Allow users to remove students directly from the single-campus page*/}
                  <button className="remove-student" value={student.id} onClick={removeStudent}>X</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

/* Visibility contorl - edit-campus-pane is only visible when users click the +Edit Campus Info button */
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

/* Visibility contorl - add-student-pane is only visible when users click the Add Student to Campus button */
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

/* Submit handler for edit campus submission - updates the user specified campus information to the database via axios put request, dispatches the new campus to our state, resets the form and then hides the edit-campus-pane. */
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
      editCampus();
    })
}

/* studentSubmitHandler for adding students to the campus - creates a new student instance in the database via axios post request and the proper campus association, dispatches the new student to our state, resets the form and then hides the edit-campus-pane. */
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
    addStudent();
  });
}

/* By clicking the remove student option, the specific student is removed from the database via axios. The state is then updated by dispatching the deleted student action to the store. */
function removeStudent(event) {
  event.preventDefault();

  let studentId = parseInt(event.target.value) ;

  axios.delete(`/api/student/${studentId}`, {
      studentId: studentId
  })
  .then(() => store.dispatch(deleteStudentFromDb(studentId)));

}

/* React-Reduc configuration */
const mapStateToProps = function (state, ownProps) {
  const campusId = Number(ownProps.match.params.campusId);

  return{
    campus: state.campuses.find(campus => campus.id === campusId),
    students: state.students.filter(student => student.CampusId === campusId)
  }
}

const SingleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default SingleCampusContainer;
