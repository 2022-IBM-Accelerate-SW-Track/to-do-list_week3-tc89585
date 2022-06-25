import React, { Component } from 'react';
import thumbNail from "../assets/thumbNail.jpg";
import "./About.css";

export default class About extends Component {
  render() {
    return (
      <div>
      <div class="split left">
        <div className="centered">
          <img 
            className="profile_image"
            src={thumbNail}
            alt="Profile Pic"
            />
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <div className="torrin_title">Torrin Curry</div>
          <div className="brief_description">
            <p>Hi, I'm Torrin Curry, a Computer Science Major at UGA. 
              I'm originally from the great city of Stone Mountain, GA</p>
            <p>In my free time, I like to play basketball with friends, and workout in the gym.</p>

          </div>
        </div>
      </div>
    </div>
  
    )
  }
}