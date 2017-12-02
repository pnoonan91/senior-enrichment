import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AllCampuses extends Component{
  render(){
    return(
      <div className="all-campuses">
        <h1 className="header-text">All Campuses</h1>
        <p>Here are all of the campuses!</p>
      </div>
    );
  }
}
