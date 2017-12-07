import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function AllCampuses (props) {

  const {campuses} = props;

    return(
      <div className="all-campuses">
        <h1 className="header-text">All Campuses</h1>
        <div className="campus-list">
          {
            campuses.map(campus => (
              <div key={campus.id} className="campus">
                <Link className="thunbnail" to={"/campuses/" + campus.id}>
                  <img src={campus.imageUrl} />
                  <div className="caption">
                    <h2>
                      <span>{campus.name}</span>
                    </h2>
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

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  };
};

const AllCampusContainer = connect(mapStateToProps)(AllCampuses);

export default AllCampusContainer;
