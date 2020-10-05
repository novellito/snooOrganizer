import styled from 'styled-components';

import {
  DANGER,
  PRIMARY,
  SNOO_BLUE,
  TEXT_HEADER
} from '../../constants/colors';
import ContentLoader from 'react-content-loader';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
const AccordionLoaderWrapper = styled.div`
  margin-bottom: 20px;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.8rem 0.1rem rgba(15, 72, 179, 0.06),
    0 20px 30px -10px rgba(15, 72, 179, 0.2);
  .accordion__heading {
    font-weight: bold;
    font-size: 1.4em;
    padding: 24px;
  }
  .accordion__button {
    color: ${TEXT_HEADER};
    cursor: pointer;
    outline: none;

    &[aria-expanded='true']::before {
      transform: rotate(45deg);
    }
    &:before {
      display: inline-block;
      content: '';
      height: 10px;
      width: 10px;
      margin-right: 12px;
      border-bottom: 4px solid currentColor;
      border-right: 4px solid currentColor;
      transform: rotate(-45deg);
      transition: transform 0.2s ease-in-out;
    }
  }

  .accordion__panel {
    padding: 0 24px 24px;
    animation: fadein 0.35s ease-in;
    .select-all-none {
      display: flex;
      align-items: center;
      margin: 0px 5px 15px;
      svg {
        height: 35px;
      }
      button {
        margin: 0 5px;
      }
    }
    svg {
      height: 35px;
    }
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const rectangleRadius = {
  rx: '8',
  ry: '8'
};
export const AccordionLoader = (props) => {
  return (
    <AccordionLoaderWrapper {...props}>
      <Accordion allowZeroExpanded preExpanded={['subreddit-filter-accordion']}>
        <AccordionItem uuid="subreddit-filter-accordion">
          <AccordionItemHeading>
            <AccordionItemButton>Filters</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="select-all-none">
              Select:
              <ContentLoader backgroundColor={PRIMARY} width="70">
                <rect x="5" y="0" width="60" height="30" {...rectangleRadius} />
              </ContentLoader>
              <ContentLoader backgroundColor={DANGER}>
                <rect
                  x="10"
                  y="0"
                  width="60"
                  height="30"
                  {...rectangleRadius}
                />
              </ContentLoader>
            </div>
            <ContentLoader backgroundColor={SNOO_BLUE} width="600">
              <rect x="5" y="0" width="60" height="25" rx="15" ry="15" />
              <rect x="80" y="0" width="60" height="25" rx="15" ry="15" />
              <rect x="155" y="0" width="60" height="25" rx="15" ry="15" />
              <rect x="230" y="0" width="90" height="25" rx="15" ry="15" />
              <rect x="340" y="0" width="60" height="25" rx="15" ry="15" />
              <rect x="420" y="0" width="110" height="25" rx="15" ry="15" />
            </ContentLoader>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </AccordionLoaderWrapper>
  );
};
export default AccordionLoader;
