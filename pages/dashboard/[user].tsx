import { useSelector } from 'react-redux';
import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';
// import Button from '../src/components/Button';

const DashboardWrapper = styled.div`
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    grid-row-gap: 20px;
    grid-column-gap: -10px;
  }
`;
export const Dashboard: React.FC = () => {
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  //   const dispatch = useDispatch();

  return (
    <DashboardWrapper>
      welcome to dashboard
      <div className="cards">
        {savedContent.map((elem: any) => (
          <PostCard
            key={elem.postId}
            url={elem.url}
            thumbnailUrl={elem.thumbnailUrl}
            postTitle={elem.postTitle}
            subreddit={elem.subreddit}
            markDown={elem.markDown}
            postId={elem.postId}
            author={elem.author}
            createdTime={elem.createdTime}
            commentBody={elem.commentBody}
          ></PostCard>
        ))}
      </div>
    </DashboardWrapper>
  );
};

export default withAuth(Dashboard);
