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
  useEffect(() => {
    dispatch(setUserSubreddits(props.savedContent.slice(0, displayCount)));
  }, [displayCount]);

  const debouncedSearch = useCallback(
    debounce((searchQuery) => setSearchInput(searchQuery), 500),
    []
  );

  const loadMorePosts = () => {
    if (displayCount + POST_INC_BY > props.savedContent.length) {
    } else {
      setTimeout(() => {
        const currCount = displayCount + POST_INC_BY;
        setDisplayCount(currCount);
      }, 1000);
    }
  };

  return (
    <DashboardWrapper>
      <Navbar />
      <h1>Welcome {props.username}</h1>

      <InfiniteScroll
        dataLength={props.savedContent.slice(0, displayCount).length}
        next={() => loadMorePosts()}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <AccordionElem
          userSubreddits={props.userSubreddits}
          savedContent={props.savedContent.slice(0, displayCount)}
          filterList={(e) => debouncedSearch(e.target.value)}
        />

        <SearchResults
          value={searchInput}
          data={props.savedContent.slice(0, displayCount)}
          renderResults={(results) => {
            return (
              <FlipMove className="cards">
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
              </FlipMove>
            );
          }}
        />
      </InfiniteScroll>
    </DashboardWrapper>
  );
}, areEqual);

export default withAuth(Dashboard);
