import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import AccordionElem from '../../src/components/Accordion';

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

export const Dashboard: React.FC<any> = (props) => {
  return (
    <DashboardWrapper>
      <h1>Welcome {props.username}</h1>
      <AccordionElem />
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
};

export default withAuth(Dashboard);
