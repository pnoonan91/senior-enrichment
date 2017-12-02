import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Header from './Header';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import StatefulCampuses from './StatefulCampuses';

export default class Main extends Component{
  render(){
    return(
      <Router>
        <div id="main">
          <div id="header">
            <Header />
          </div>
            <Switch>
              <Route exact path="/" component={StatefulCampuses} />
              <Route exact path="/students" component={AllStudents} />
            </Switch>
            <div id="footer">
              <p>©2017 - The Margaret Hamilton Interplanetary Academy of JavaScript</p>
            </div>
        </div>
      </Router>
    )
  }
}
