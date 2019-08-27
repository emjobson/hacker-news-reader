import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import parse from 'html-react-parser';

export default class NestedComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localCollapsed: false
    };
  }

  render() {
    const { localCollapsed } = this.state;
    const { content, time_ago, user, comments, onClickUser } = this.props;
    return (
      <div style={{ marginTop: '1em' }}>
        <div>
          <span
            className={styles.collapseButton}
            onClick={() => {
              this.setState({ localCollapsed: !localCollapsed });
            }}
          >
            {`[${localCollapsed ? '+' : '-'}]`}
          </span>
          <span> </span>
          <span
            onClick={() => {
              onClickUser(user);
            }}
            className={styles.user}
          >
            {user}
          </span>
          <span> </span>
          <span className={styles.time}>{time_ago}</span>
        </div>
        {!localCollapsed && (
          <div style={{ marginLeft: '2em' }}>
            <div style={{ fontSize: '.9em' }}>{parse(content)}</div>
            {comments.map((comment, idx) => {
              const { content, time_ago, user, comments } = comment;
              return (
                <NestedComment
                  key={idx}
                  content={content}
                  time_ago={time_ago}
                  user={user}
                  comments={comments}
                  onClickUser={onClickUser}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

NestedComment.propTypes = {
  content: PropTypes.string,
  time_ago: PropTypes.string,
  user: PropTypes.string,
  comments: PropTypes.array,
  onClickUser: PropTypes.func
};
