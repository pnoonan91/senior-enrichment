import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AllStudents extends Component{
  render(){
    return(
      <div className="all-students">
        <h1 className="header-text">All Students</h1>
        <p>Here are all of the students!</p>
      </div>
    );
  }
}
