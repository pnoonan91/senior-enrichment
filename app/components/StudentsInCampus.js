import React from 'react';

const StudentsInCampus = (props) => {
  const studentsInCampus = props.students;
  console.log('From StudentsInCampus: ', studentsInCampus);
  return(
    <div className="all-students">
    <table id="all-students-table-campus">
      <tr id="all-students-table-header">
        <th className="student-table-header">Student ID</th>
        <th className="student-table-header">Full Name</th>
      </tr>
      {studentsInCampus && studentsInCampus.map(student => (
        <tr className="student-listing" key={student.id}>
          <td className="student-listing-item-center">{student.id}</td>
          <td className="student-listing-item">{student.name}</td>
        </tr>
      ))}
    </table>
  </div>
  )
}

export default StudentsInCampus;
