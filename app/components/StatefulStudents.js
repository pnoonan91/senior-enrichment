import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AllStudents from './AllStudents';

export default class StatefulStudents extends Component {
  constructor(){
    super();
    this.state = {
      students: []
    }
  }

  componentDidMount(){
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      this.setState({students});
    });
  }

  render(){
    const students = this.state.students;

    return(
      <AllStudents students={students} />
    );
  }
}
