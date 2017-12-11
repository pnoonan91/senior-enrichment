import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Welcome (props) {

    return(
      <div className = "welcome-page">
        <h1 className="no-top-margin">Welcome</h1>
        <div className="welcome-img">
          <img src="https://news.nationalgeographic.com/content/dam/news/2015/12/21/yearinspace/01yearinspace2015.jpg" />
        </div>
        <p>Thank you for visiting the Margaret Hamilton Interplanetary Academy of JavaScript, a top ranked JavaScript academy with campuses across the galaxy.</p>
        <p>Our students get hired by top companies in the Milky-Way and beyond!</p>
        <p className="no-bottom-margin">Be sure to check out our campus locations and let us know if we can help you answer any of the questions you might have about our programs!</p>
      </div>
    );
}

export default Welcome;
