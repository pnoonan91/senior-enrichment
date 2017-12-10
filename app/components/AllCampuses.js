import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {addNewCampusToServer, deleteCampusFromDb, fetchCampuses, fetchStudents} from '../reducers';
import axios from 'axios';

function AllCampuses (props) {

  const {campuses} = props;

    return(
      <div className="all-campuses">
        <div className="all-campuses-header">
          <h1 className="header-text">All Campuses</h1>
          <a id="add-new-campus" onClick={addNewCampus}>+New Campus</a>
        </div>

        <div id="add-campus-pane">
          <h2 className="header-text">Add New Campus</h2>
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
                      <button className="delete-campus-btn" value={campus.id} onClick={removeCampus}>Remove Campus</button>
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
  });
}

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

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  };
};

const AllCampusContainer = connect(mapStateToProps)(AllCampuses);

export default AllCampusContainer;
