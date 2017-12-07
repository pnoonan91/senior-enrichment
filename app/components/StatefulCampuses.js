import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import store from '../store';
import {gotCampusesFromServer, fetchCampuses} from '../reducers';

export default function StatefulCampuses () {

  return(
    <AllCampuses />
  )
}

// export default class StatefulCampuses extends Component {
//   // constructor(){
//   //   super();
//   //   this.state = store.getState();
//   // }

//   componentDidMount(){
//     const campusesThunk = fetchCampuses();
//     store.dispatch(campusesThunk);
//   }

//   // componentWillUnmount(){
//   //   this.unsubscribe();
//   // }

//   render() {
//     return(
//       <AllCampuses />
//     );
//   }
// }
