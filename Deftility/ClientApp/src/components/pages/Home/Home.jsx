import React from 'react';
import { Link } from 'react-router-dom';

import "./Home.scss";

import HomeImage from '../../../images/Home.png';
import HomeItem1 from '../../../images/HomeItem1.png';
import HomeItem2 from '../../../images/HomeItem2.png';
import HomeItem3 from '../../../images/HomeItem3.png';
import HomeItem4 from '../../../images/HomeItem4.png';

export default function Home() {
  return (
    <main id="home-main">
      <section className="home-section first-section">
        <div className="fs-container">
          <img src={HomeImage} className="homeImg" alt="home-globe" />
          <div className="fs-text-wrapper">
            <h1>Explore the world's <br></br> work marketplace.</h1>
            <h2>Find great talent. Build your business.<br></br> Take your career to the next level.</h2>
            <div className="fs-buttons-wrapper">
              <Link to="/jobs">Find Work</Link>
              <Link to="/talents">Find Talent</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section second-section">
        <div className="ss-container">
          <h1>Need something done?</h1>
          <div className="ss-items">
            <div className="ss-item">
              <div className="ss-item-heading">
                <img src={HomeItem1} alt="item1" />
                <h3>Post a job</h3>
              </div>
              <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive offers will come within minutes.</p>
            </div>
            <div className="ss-item">
              <div className="ss-item-heading">
                <img src={HomeItem2} alt="item2" />
                <h3>Hire freelancers</h3>
              </div>
              <p>No job is too big or too small. We've got freelancers ready for jobs of any size or budget! We can get it done!</p>
            </div>
            <div className="ss-item">
              <div className="ss-item-heading">
                <img src={HomeItem3} alt="item3" />
                <h3>Pay securely</h3>
              </div>
              <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
            </div>
            <div className="ss-item">
              <div className="ss-item-heading">
                <img src={HomeItem4} alt="item4" />
                <h3>Quality work</h3>
              </div>
              <p>It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
