import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StoryPreview from '../../Components/StoryPreview';
import { getPage } from '../../API';
import styles from './styles.module.css';
import { ITEMS_PER_PAGE } from '../../constants';

class PreviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewsLi: [],
      curLoadedPageNum: null
    };
  }

  async syncPage() {
    const type = this.props.location.pathname.split('/')[1];
    const pageNum = parseInt(this.props.match.params.id);

    const page = await getPage(type, pageNum); // add this. to things I've learned
    this.setState({
      previewsLi: page,
      curLoadedPageNum: pageNum
    });
  }

  // user clicks button to change page --> url updated --> props update --> if correct props change, re-sync page
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // prevent infinite loop
      this.syncPage();
    }
  }

  // TODO: figure out why I need to put API calls here
  componentDidMount() {
    // add async componentDidMount to load stuff to things I've learned
    this.syncPage();
  }

  render() {
    const { previewsLi, curLoadedPageNum } = this.state;
    const type = this.props.location.pathname.split('/')[1];

    //  const pageNum = parseInt(this.props.match.params.id);

    if (curLoadedPageNum === null) {
      return <div style={{ paddingTop: '60px' }}>loading...</div>;
    } else {
      return (
        <>
          <ol
            start={1 + (curLoadedPageNum - 1) * ITEMS_PER_PAGE}
            className={styles.list}
          >
            {previewsLi.map((preview, idx) => (
              <li key={idx}>
                <StoryPreview preview={preview} />
              </li>
            ))}
          </ol>
          <span style={{ marginBottom: '1em' }}>
            {curLoadedPageNum > 1 && ( // prev
              <span
                className={styles.prev}
                onClick={() => {
                  this.props.history.push(
                    '/' + type + '/' + (curLoadedPageNum - 1).toString()
                  );
                }}
              >
                {'< Prev'}
              </span>
            )}
            {previewsLi.length === ITEMS_PER_PAGE && curLoadedPageNum < 10 && (
              <span
                className={styles.next}
                onClick={() => {
                  this.props.history.push(
                    '/' + type + '/' + (curLoadedPageNum + 1).toString()
                  );
                }}
              >
                {'Next >'}
              </span>
            )}
          </span>
        </>
      );
    }
  }
}

export default withRouter(PreviewList);
