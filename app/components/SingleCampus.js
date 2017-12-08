import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

function SingleCampus (props) {
  const { campus, students } = props;

  return (
    <div className="single-campus">
      <h1 className="header-text">{campus.name}</h1>
      <h4>{campus.description}</h4>
      <div className="all-students">
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
  );
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
