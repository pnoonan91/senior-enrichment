import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {addNewCampusToServer, deleteCampusFromDb, fetchCampuses, fetchStudents} from '../reducers';
import axios from 'axios';

function AllCampuses (props) {

  //deconstruct campuses from props to use throughout this component
  const {campuses} = props;

    return(
      <div className="all-campuses">
        <div className="all-campuses-header">
          <h1 className="header-text">All Campuses</h1>
          <a id="add-new-campus" onClick={addNewCampus}>+New Campus</a>
        </div>

        {/* Add campus pane is initially hidden. When a user clicks the '+New Campus' button (displayed above), the add-campus-pane node is displayed, allowing users to create a new campus */}
        <div id="add-campus-pane">
          <h2 className="header-text">Add New Campus</h2>
          {/* On submit - call the submitHander, which posts our new campus to the Db via axios and will re-render the current page by dispatching the new entry to state. */}
          <form id="campus-input" onSubmit={submitHandler}>
          <div>
            <label>Campus Name</label>
            <input name="campusName" />
          </div>
          <div>
            <label>Description</label>
            <input name="campusDescription" />
          </div>
          <div>
            <button>Submit</button>
          </div>
          </form>
        </div>

        {/* By default, render all campuses currently in our state on the all campus page */}
        <div className="campus-list">
          {
            campuses.map(campus => (
              <div key={campus.id} className="campus">
                <Link className="thunbnail" to={"/campuses/" + campus.id}>
                  <div className="campus-image">
                    <img className="campus-image-src" src={campus.imageUrl} />
                  </div>
                  <div className="caption">
                    <h3 className="header-text">
                      <span>{campus.name}</span>
                    </h3>
                    <p className="caption-description">
                      {campus.shortDescription}
                    </p>
                    <div className="delete-campus">

                      {/* Allow users to delete entire campuses (including all students in that campus) from the all campus page - removeCampus function is called when clicked */}
                      <button className="delete-button" value={campus.id} onClick={removeCampus}>Remove Campus</button>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )
          }
        </div>
      </div>
    );
}

/* Visibility contorl - add-campus-pane is only visible when users click the +New Campus button */
function addNewCampus() {
  var element = document.getElementById("add-campus-pane")

  if(!element.style.display){
    element.style.display = "block";
  }
  else if(element.style.display === "none"){
    element.style.display = "block";
  } else{
    element.style.display = "none";
  }

}

/* Submit handler for new campus submission - posts the user specified campus information to the database via axios, dispatches the new campus to our state, resets the form and then hides the add-campus-pane. */
function submitHandler(event) {
  event.preventDefault();

  let name = event.target.campusName.value;
  let description = event.target.campusDescription.value;

  axios.post('/api/campus', {
    name: name,
    description: description,
  })
  .then(res => res.data)
  .then(campus => {
    store.dispatch(addNewCampusToServer(campus));
    document.getElementById('campus-input').reset();
    addNewCampus();
  });
}

/* By clicking the remove campus option, the specific campus is removed from the database via axios. The state is then updated by fetching the campuses and students after the removal of the stuent takes place. All stuents assocaited to the deleted campus will also be removed (see cascade configuration on server-side) */
function removeCampus(event) {
  event.preventDefault();

  let campusId = parseInt(event.target.value) ;

  axios.delete(`/api/campus/${campusId}`, {
      campusId: campusId
  })
  .then(() => {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents())
  });

}

/* react-redux configuration */
const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  };
};

const AllCampusContainer = connect(mapStateToProps)(AllCampuses);

export default AllCampusContainer;
