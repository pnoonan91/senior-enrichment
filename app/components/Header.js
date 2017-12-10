import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component{
  render(){
    return(
      <div className="header-div">
        <h1>Margaret Hamilton Academy</h1>
        <div className="header-div-nav-links">
          <Link to="/">Home</Link>
          <Link to="/students">Sudents</Link>
        </div>
      </div>
    );
  }
}
