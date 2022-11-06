import React from 'react';
import UserLinksDropdown from '../../users/UserLinksDropdown/UserLinksDropdown';
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import './Navigation.scss';
import Logo from '../../../images/logo.png';

function Navigation(props) {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-site-links">
          <div className="nav-item">
            <Link to="/jobs">Find Work</Link>
          </div>
          <div className="nav-item">
            <Link to="/talents">Find Talent</Link>
          </div>
        </div>
        <div className="nav-user-links">
          {
            props.isAuthenticated
              ?
              <>
                <Link to="/create-job" className="post-project-btn">Post a Project</Link>
                <UserLinksDropdown />
              </>
              :
              <>
                <div className="nav-item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="nav-item">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
}

// determines what PART of the state we expose to this component? Must return plain object
function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
