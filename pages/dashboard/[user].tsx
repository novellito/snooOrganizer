import { useSelector } from 'react-redux';
import { withAuth } from '../../src/components/AuthHoc';
// import Button from '../src/components/Button';

export const Dashboard: React.FC = () => {
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  //   const dispatch = useDispatch();

  return (
    <>
      welcome to dashboard
      {/* move this logic to a component */}
      {/* {savedContent.map((elem: any) => (
        <div key={elem.id}>{elem.subreddit}</div>
      ))} */}
    </>
  );
};

export default withAuth(Dashboard);
