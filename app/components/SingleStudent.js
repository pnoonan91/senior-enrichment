import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function SingleStudent (props) {
  const {students} = props;
  console.log('students prop: ', students);

  return(
    <div>
      <h1>{students.name}</h1>
      <a href={"mailto:" + students.email}>{students.email}</a>
      <table>
        <tr>
          <td>Campus:</td>
          <td>{students.Campus.name}</td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td>{students.firstName}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td>{students.lastName}</td>
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
