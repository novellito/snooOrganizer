import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import deepEqual from 'deep-equal';

const DashboardLoaderWrapper = styled.section`
  .cards {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-column-gap: 5px;
    grid-row-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(344px, 1fr));
  }
`;

export const DashboardLoader: React.FC<any> = (props) => {
  return (
    <DashboardLoaderWrapper>
      <h1>Welcome {props.username}</h1>

      {/* <AccordionElem
        userSubreddits={props.userSubreddits}
        savedContent={props.savedContent}
        filterList={(e) => debouncedSearch(e.target.value)}
      /> */}
      {/* <SearchResults
        value={searchInput}
        data={props.savedContent}
        renderResults={(results) => {
          console.log(results);
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
      /> */}
    </DashboardLoaderWrapper>
  );
};

export default DashboardLoader;
