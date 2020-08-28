import { useSelector } from 'react-redux';
import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  .cards {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-column-gap: 5px;
    grid-row-gap: 20px;
    margin: 0 60px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
            postId={elem.postId}
            author={elem.author}
            createdTime={elem.createdTime}
            commentBody={
              new DOMParser().parseFromString(elem.commentBody, 'text/xml')
                .firstChild?.textContent
            }
          ></PostCard>
        ))}
      </div>
    </DashboardWrapper>
  );
};

export default withAuth(Dashboard);
