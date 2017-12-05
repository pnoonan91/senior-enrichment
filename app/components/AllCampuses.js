import React, {Component} from 'react';
import {Link} from 'react-router-dom';


const AllCampuses = (props) => {

  const campuses = props.campuses;

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

export default AllCampuses;
