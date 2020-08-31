import styled from 'styled-components';
import { TEXT_PRIMARY, TEXT_HEADER } from '../constants/colors';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { useSelector, useDispatch } from 'react-redux';
import { FilterPill } from './FilterPill';
import { ISavedContent } from '../interfaces/interfaces';

const AccordionWrapper = styled.section`
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

interface AccordionProps {
  //   bgColor: string;
  //   text: string;
  //   style?: object;
  customClass?: string;
  //   click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   disabled?: boolean;
}

export const AccordionElem = (props: AccordionProps) => {
  const dispatch = useDispatch();
  const savedContent = useSelector(({ user }: any) => user.savedContent);
  const subredditSet = new Set<string>();
  savedContent.forEach((sub: ISavedContent) => subredditSet.add(sub.subreddit));

  return (
    <AccordionWrapper {...props} className={props.customClass}>
      <Accordion allowZeroExpanded preExpanded={['subreddit-filter-accordion']}>
        <AccordionItem uuid="subreddit-filter-accordion">
          <AccordionItemHeading>
            <AccordionItemButton>Filter By Subreddits</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p
              onClick={() => {
                dispatch({ type: 'RESET_FILTER' });
              }}
            >
              All
            </p>
            {[...subredditSet].map((sub) => (
              <FilterPill subreddit={sub} key={sub} />
            ))}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default AccordionElem;
