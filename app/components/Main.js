import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Header from './Header';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import StatefulCampuses from './StatefulCampuses';
import StatefulStudents from './StatefulStudents';
import SingleCampus from './SingleCampus';
import {gotCampusesFromServer, fetchCampuses} from '../reducers';
import store from '../store';

export default class Main extends Component{

  componentDidMount(){
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
  }

  render(){
    return(
      <Router>
        <div id="main">
          <div id="header">
            <Header />
          </div>
            <Switch>
              <Route exact path="/" component={AllCampuses} />
              <Route path='/campuses/:campusId' component={SingleCampus} />
              <Route exact path="/students" component={StatefulStudents} />
            </Switch>
            <div id="footer">
              <p>©2017 - The Margaret Hamilton Interplanetary Academy of JavaScript</p>
            </div>
        </div>
      </Router>
    )
  }
}
