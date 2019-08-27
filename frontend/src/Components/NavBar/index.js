import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.module.css';

function NavBar(props) {
  return (
    <nav className={styles.nav}>
      <span
        className={styles.mainLink}
        onClick={() => {
          props.history.push('/top/1');
        }}
      >
        HackerNews Reader
      </span>
      <span
        className={styles.link}
        onClick={() => {
          props.history.push('/top/1');
        }}
      >
        Top
      </span>
      <span
        className={styles.link}
        onClick={() => {
          props.history.push('/new/1');
        }}
      >
        New
      </span>
      <span
        className={styles.link}
        onClick={() => {
          props.history.push('/show/1');
        }}
      >
        Show
      </span>
      <span
        className={styles.link}
        onClick={() => {
          props.history.push('/ask/1');
        }}
      >
        Ask
      </span>
      <span
        className={styles.link}
        onClick={() => {
          props.history.push('/jobs/1');
        }}
      >
        Jobs
      </span>
    </nav>
  );
}

export default withRouter(NavBar);
