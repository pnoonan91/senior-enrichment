import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';

export default class StatefulCampuses extends Component {
  constructor(){
    super();
    this.state = {
      campuses: []
    };
  }

  componentDidMount(){
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      this.setState({campuses});
    });
  }

  render() {

    const campuses = this.state.campuses;

    return(
      <AllCampuses campuses={campuses} />
    );
  }
}
