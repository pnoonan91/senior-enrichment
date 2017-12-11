import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component{
  render(){
    return(
      <div className="header-div">
        <h1><Link to="/">Margaret Hamilton Academy</Link></h1>
        <div className="header-div-nav-links">
          <Link to="/campuses">Campuses</Link>
          <Link to="/students">Sudents</Link>
        </div>
      </div>
    );
  }
}
