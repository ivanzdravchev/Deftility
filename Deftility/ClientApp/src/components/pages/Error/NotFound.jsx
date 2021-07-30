import React from 'react';

import './NotFound.scss';

export default function NotFound({ history }) {
  return (
    <div className="error-page-wrapper">
      <h1>404</h1>
      <h3>Page not found!</h3>
      <h4>Sorry, we can't find what you're looking for.</h4>
      <button className="go-back-button" onClick={history.goBack}>Head back</button>
    </div>
  );
}
