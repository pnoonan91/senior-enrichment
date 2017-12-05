import React, {Component} from 'react';
import axios from 'axios';
import StudentsInCampus from './StudentsInCampus';

export default class SingleCampus extends Component{
  constructor(){
    super();
    this.state = {
      campus: {}
    };
  }

  componentDidMount(){
    const campusId = this.props.match.params.campusId;

    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then(campus => this.setState({campus}));
  }

  render(){
    const campus = this.state.campus;
    const students = this.state.campus.Students;

    return(
      <div className="single-campus">
        <h1 className="header-text">{campus.name}</h1>
        <h4>{campus.description}</h4>
        <StudentsInCampus students={students}/>
      </div>
    )
  }
}
