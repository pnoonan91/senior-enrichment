import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Header from './Header';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import {gotCampusesFromServer, fetchCampuses, fetchStudents} from '../reducers';
import store from '../store';
import SingleStudent from './SingleStudent';
import Welcome from './Welcome';

export default class Main extends Component{

  componentDidMount(){
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render(){
    return(
      <Router>
        <div id="main">
          <div id="header">
            <Header />
          </div>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/campuses" component={AllCampuses} />
              <Route path='/campuses/:campusId' component={SingleCampus} />
              <Route exact path="/students" component={AllStudents} />
              <Route exact path="/students/:studentId" component={SingleStudent} />
            </Switch>
            <div id="footer">
              <p>©2017 - The Margaret Hamilton Interplanetary Academy of JavaScript</p>
            </div>
        </div>
      </Router>
    )
  }
}
