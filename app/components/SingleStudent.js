import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

function SingleStudent (props) {
  const {students} = props;
  console.log('students prop: ', students);

  return(
    <div className="single-student">
      <h1 className="header-text">{students.name}</h1>
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
        <td><Link to={`/campuses/${students.Campus.id}`}>{students.Campus.name}</Link></td>
      </tr>
      <tr>
          <td>GPA:</td>
          <td>{students.gpa}</td>
        </tr>
      </table>
    </div>
  )
}

const mapStateToProps = function (state, ownProps) {
  const studentId = Number(ownProps.match.params.studentId)
  console.log(studentId)

  return{
    students: state.students.find(student => student.id === studentId)
  }
}

const SingleStudentContainer = connect(mapStateToProps)(SingleStudent);

export default SingleStudentContainer;
