import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles.module.css';

/*
 * -respond to Ian
 * -look up things I'm still confused about, like when axios attempts parse
 */

function urlIsAbsolute(url) {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');
  return r.test(url);
}

class StoryPreview extends Component {
  render() {
    const { preview } = this.props;
    const {
      id,
      title,
      points,
      user,
      type,
      time_ago,
      comments_count,
      url,
      domain
    } = preview;
    return (
      <div className={styles.container}>
        <div>
          {/* though this avoids using Router history and always triggers page reload, 
            it gives flexibility bc url's may be local or external */}
          <a
            href={urlIsAbsolute(url) ? url : '/item/' + id.toString()}
            className={styles.title}
          >
            {title}
          </a>
          {domain !== undefined && ( // was type not 'ask'
            <a
              href={'http://' + domain}
              className={styles.domain}
            >{`(${domain})`}</a>
          )}
        </div>
        <div>
          {type !== 'job' && ( // was type not 'job'
            <>
              <span className={styles.points}>{`${points || 0} point${
                points !== 1 ? 's' : ''
              } by`}</span>
              <span
                onClick={() => {
                  this.props.history.push('/user/' + user);
                }}
                className={styles.user}
              >
                {user}
              </span>
            </>
          )}
          <span className={styles.time}>{time_ago}</span>
          {type !== 'job' && ( // was type not 'job'
            <span
              onClick={() => {
                this.props.history.push('/item/' + id);
              }}
              className={styles.comments}
            >
              {comments_count === 0
                ? 'discuss'
                : `${comments_count} comment` + (comments_count > 1 ? 's' : '')}
            </span>
          )}
        </div>
      </div>
    );
  }
}

StoryPreview.propTypes = {
  preview: PropTypes.object
};

export default withRouter(StoryPreview);
