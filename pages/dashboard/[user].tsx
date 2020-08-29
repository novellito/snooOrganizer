import { useSelector } from 'react-redux';
import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';

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

export const Dashboard: React.FC = () => {
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  //   const dispatch = useDispatch();

  return (
    <DashboardWrapper>
      welcome to dashboard
      <FlipMove className="cards">
        {savedContent.map((elem: any) => (
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
        ))}
      </FlipMove>
    </DashboardWrapper>
  );
};

export default withAuth(Dashboard);
