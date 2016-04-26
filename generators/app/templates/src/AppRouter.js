import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import mui from 'material-ui';

class AppRouter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };


  render() {
    return (
      <Router {...this.props} />
    );
  }
}

export default AppRouter;
