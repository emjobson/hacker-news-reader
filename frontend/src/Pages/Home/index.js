import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// placeholder in case I decide to create real home page. currently routes to '/top'
class Home extends Component {
  render() {
    this.props.history.replace('/top/1');
    return <div>Home</div>;
  }
}

export default withRouter(Home);
