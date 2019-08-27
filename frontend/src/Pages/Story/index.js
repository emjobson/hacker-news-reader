import React, { Component } from 'react';
import StoryPreview from '../../Components/StoryPreview';
import styles from './styles.module.css';
import { getItem } from '../../API';
import NestedComment from '../../Components/NestedComment';
import parse from 'html-react-parser';

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      item: {}
    };
  }

  async componentDidMount() {
    // location object updated even when user loads page through anchor tag (rather than clicking a BrowserRouter Link)
    const item = await getItem(this.props.match.params.id);
    this.setState({ isFetching: false, item });
  }

  render() {
    const { isFetching, item } = this.state;
    if (isFetching) {
      return <div style={{ paddingTop: '60px' }}>Loading...</div>;
    }
    const { comments, time, content, ...preview } = item;
    return (
      <div className={styles.container}>
        <div className={styles.preview}>
          <StoryPreview preview={preview} />
        </div>
        {content && parse(content)}
        {comments
          .filter(comment => comment.user !== undefined) // made earlier mistake by filtering out non-top level deleted comments, where I meant to delete only top-level ones
          .map((comment, idx) => {
            const { content, time_ago, user, comments } = comment;
            return (
              <NestedComment
                key={idx}
                content={content}
                time_ago={time_ago}
                user={user}
                comments={comments}
                onClickUser={user => {
                  this.props.history.push('/user/' + user);
                }}
              />
            );
          })}
      </div>
    );
  }
}
