import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import AccordionElem from '../../src/components/Accordion';
import React, { useState, useCallback, useEffect } from 'react';
import deepEqual from 'deep-equal';
import { ISavedContent } from '../../src/interfaces/interfaces';
import SearchResults from 'react-filter-search';
import debounce from 'lodash.debounce';
import Navbar from '../../src/components/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { setUserSubreddits } from '../../src/store/actions';
import { POST_INC_BY } from '../../src/constants/constants';
import ScrollTop from '../../src/components/ScrollTop';
import Sticky from 'react-sticky-el';

interface DashboardProps {
  subreddit: string;
  userSubreddits: Array<{ isDisplayed: boolean; subreddit: string }>;
  username: string;
  savedContent: Array<ISavedContent>;
}

const DashboardWrapper = styled.section`
  .cards {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-column-gap: 5px;
    grid-row-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(344px, 1fr));
  }
  .accordion-container {
    height: 300px;
  }
  .welcome {
    display: flex;
    align-items: center;
    height: 85px;
    justify-content: center;
    h1 {
      font-size: 1.7em;
    }
  }
`;

const getCommentBody = (comment: string) => {
  if (!comment) return null;

  return new DOMParser().parseFromString(comment, 'text/xml').firstChild
    ?.textContent;
};
const areEqual = (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps, true);
};

export const Dashboard: React.FC<DashboardProps> = React.memo((props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [displayCount, setDisplayCount] = useState(POST_INC_BY);
  const [hasMore, setHasMore] = useState(true);
  const currDisplayed = props.savedContent.slice(0, displayCount);
  useEffect(() => {
    dispatch(setUserSubreddits(props.savedContent.slice(0, displayCount)));
  }, [displayCount]);

  const debouncedSearch = useCallback(
    debounce((searchQuery) => setSearchInput(searchQuery), 500),
    []
  );

  const loadMorePosts = () => {
    if (displayCount + POST_INC_BY > props.savedContent.length) {
      setHasMore(false);
    }
    // setTimeout(() => {
    setDisplayCount(displayCount + POST_INC_BY);
    // }, 500);
  };

  return (
    <DashboardWrapper id="dashboard-wrapper">
      <Navbar />
      <section className="welcome">
        <h1>Welcome {props.username}</h1>
      </section>
      <Sticky stickyStyle={{ zIndex: 5 }}>
        <div className="accordion-container">
          <AccordionElem
            userSubreddits={props.userSubreddits}
            savedContent={currDisplayed}
            filterList={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </Sticky>
      <SearchResults
        value={searchInput}
        data={currDisplayed}
        renderResults={(results) => {
          return (
            <>
              <FlipMove>
                <InfiniteScroll
                  className="cards"
                  dataLength={currDisplayed.length}
                  next={() => loadMorePosts()}
                  hasMore={hasMore}
                  endMessage={<></>}
                  loader={<h4>Loading...</h4>}
                  style={{ overflow: 'hidden', height: 'auto' }}
                >
                  {results.map(
                    (elem: any) =>
                      elem.isDisplayed && (
                        <PostCard
                          key={elem.postId}
                          url={elem.url}
                          thumbnailUrl={elem.thumbnailUrl}
                          postTitle={elem.postTitle}
                          subreddit={elem.subreddit}
                          postId={elem.postId}
                          author={elem.author}
                          createdTime={elem.createdTime}
                          commentBody={getCommentBody(elem.commentBody)}
                        ></PostCard>
                      )
                  )}
                </InfiniteScroll>
              </FlipMove>
            </>
          );
        }}
      />
      <ScrollTop />
    </DashboardWrapper>
  );
}, areEqual);

export default withAuth(Dashboard);
