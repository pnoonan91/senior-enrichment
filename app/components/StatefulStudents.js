import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AllStudents from './AllStudents';

export default class StatefulStudents extends Component {
  constructor(){
    super();
    this.state = {
      students: [],
      campuses: []
    }
  }

  componentDidMount(){


    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      this.setState({campuses})
    })
  }

  render(){
    const students = this.state.students;
    const campuses = this.state.campuses;

    return (
      <AllStudents students={students} campuses={campuses} />
    );
  }
}
