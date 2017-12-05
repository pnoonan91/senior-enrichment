import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const AllStudents = (props) => {
  const students = props.students;

  return(
    <div className="all-students">
    <h1 className="header-text">All Students</h1>
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

export default AllStudents;
