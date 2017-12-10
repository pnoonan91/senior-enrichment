import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCampuses, fetchStudents} from '../reducers';
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
      <div className="image-container">
        <img className="campus-page-image" src={campus && campus.imageUrl} />
      </div>
      <table id="all-students-table-campus">
        <tr id="all-students-table-header">
          <th className="student-table-header">Student ID</th>
          <th className="student-table-header">Full Name</th>
        </tr>
        {students && students.map(student => (
          <tr className="student-listing" key={student.id}>
            <td className="student-listing-item-center">{student.id}</td>
            <td className="student-listing-item"><Link to={`/students/${student.id}`}>{student.name}</Link></td>
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

const mapStateToProps = function (state, ownProps) {
  const campusId = Number(ownProps.match.params.campusId);

  return{
    campus: state.campuses.find(campus => campus.id === campusId),
    students: state.students.filter(student => student.CampusId === campusId)
  }
}

const SingleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default SingleCampusContainer;
