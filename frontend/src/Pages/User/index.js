import React, { Component } from 'react';
import { getUser } from '../../API';
import parse from 'html-react-parser';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  async componentDidMount() {
    const userName = this.props.match.params.id;
    const user = await getUser(userName);
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user === null) {
      return (
        <div style={{ paddingTop: '60px', margin: '0 30px' }}>Loading...</div>
      );
    }

    const { id, created, karma, about } = user;
    return (
      <div
        style={{
          paddingTop: '60px',
          margin: '0 30px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1em',
            fontSize: '20px',
            color: '#b92b27',
            fontWeight: 'bold'
          }}
        >
          <div>{id}</div>
          <div>{`${karma} karma`}</div>
        </div>
        <div
          style={{ color: 'grey', fontSize: '.8em' }}
        >{`created ${created}`}</div>
        {about && <div>{parse(about)}</div>}
      </div>
    );
  }
}
