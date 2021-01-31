import styled from 'styled-components';
import AccordionLoader from './AccordionLoader';
import PostCardLoader from './PostCardLoader';

const numCardsToLoad = 12;

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
      <AccordionLoader />
      <div className="cards">
        {[...Array(numCardsToLoad)].map((e, i) => (
          <PostCardLoader key={i} />
        ))}
      </div>
    </DashboardLoaderWrapper>
  );
};

export default DashboardLoader;
