import { useSelector } from 'react-redux';
import { withAuth } from '../../src/components/AuthHoc';
import PostCard from '../../src/components/PostCard/PostCard';
// import Button from '../src/components/Button';

export const Dashboard: React.FC = () => {
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  //   const dispatch = useDispatch();

  return (
    <>
      welcome to dashboard
      {savedContent.map((elem: any) => (
        <PostCard
          key={elem.id}
          url={elem.url}
          thumbnailUrl={elem.thumbnailUrl}
          title={elem.title}
          subreddit={elem.subreddit}
          markDown={elem.markDown}
        ></PostCard>
        // <div key={elem.id}>{elem.subreddit}</div>
      ))}
      {/* {savedContent.map((elem: any) => (
        <div key={elem.id}>{elem.subreddit}</div>
      ))} */}
    </>
  );
};

export default withAuth(Dashboard);
