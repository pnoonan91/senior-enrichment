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

    console.log(this.state.campuses);
  }

  render() {

    const campuses = this.state.campuses;
    console.log(campuses);

    return(
      <AllCampuses campuses={campuses} />
    );
  }
}
