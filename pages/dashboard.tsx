import { useSelector } from 'react-redux';
// import Button from '../src/components/Button';

export const Dashboard = () => {
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  //   const dispatch = useDispatch();

  return (
    <div>
      welcome to dashboard
      {savedContent.map((elem: any) => (
        <div key={elem.id}>{elem.subreddit}</div>
      ))}
    </div>
  );
};

export default Dashboard;
