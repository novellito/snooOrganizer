import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import AccordionElem from '../../src/components/Accordion';
import React from 'react';
import deepEqual from 'deep-equal';

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
  console.log(prevProps.userSubreddits, nextProps.userSubreddits);
  const allPrevSavedContentTrue =
    prevProps.savedContent.every((elem) => elem.isDisplayed) &&
    prevProps.savedContent.length > 0;
  const allNextSavedContentTrue =
    nextProps.savedContent.every((elem) => elem.isDisplayed) &&
    nextProps.savedContent.length > 0;

  const allPrevSubredditsTrue =
    prevProps.userSubreddits.every((elem) => elem.isDisplayed === false) &&
    prevProps.userSubreddits.length > 0;

  const allNextSubredditsTrue =
    nextProps.userSubreddits.every((elem) => elem.isDisplayed === false) &&
    nextProps.userSubreddits.length > 0;
  // console.log('subs', allPrevSubredditsTrue, allNextSubredditsTrue);

  // const allPrevSubredditsTrue2 =
  //   prevProps.userSubreddits.every((elem) => elem.isDisplayed === true) &&
  //   prevProps.userSubreddits.length > 0;

  // const allNextSubredditsTrue2 =
  //   nextProps.userSubreddits.every((elem) => elem.isDisplayed === true) &&
  //   nextProps.userSubreddits.length > 0;
  // console.log('subs2', allPrevSubredditsTrue2, allNextSubredditsTrue2);
  console.log(
    deepEqual(prevProps.userSubreddits, nextProps.userSubreddits, true)
  );
  // console.log(deepEqual([], []));

  if (
    allPrevSavedContentTrue === allNextSavedContentTrue &&
    allPrevSubredditsTrue === allNextSubredditsTrue &&
    deepEqual(prevProps.userSubreddits, nextProps.userSubreddits, true)
    // allPrevSubredditsTrue2 === allNextSubredditsTrue2
  ) {
    return true;
  }
  return false;
};

export const Dashboard: React.FC<any> = React.memo((props) => {
  return (
    <DashboardWrapper>
      <h1>Welcome {props.username}</h1>
      <AccordionElem userSubreddits={props.userSubreddits} />
      <FlipMove className="cards">
        {props.savedContent.map(
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
    </DashboardWrapper>
  );
}, areEqual);

export default withAuth(Dashboard);
