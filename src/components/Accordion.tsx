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
import { FilterChip } from './FilterChip';
import { FilterChipAll } from '../constants/enums';
import { TOGGLE_ALL, TOGGLE_FILTER_CHIP } from '../store/actionTypes';
import { IDashboardState } from '../interfaces/interfaces';
import Button from './Button';

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
  customClass?: string;
}

export const AccordionElem: React.FC<AccordionProps> = (props) => {
  const dispatch = useDispatch();
  const userSubreddits = useSelector(
    ({ dashboard }: { dashboard: IDashboardState }) => dashboard.userSubreddits
  );

  return (
    <AccordionWrapper {...props} className={props.customClass}>
      <Accordion allowZeroExpanded preExpanded={['subreddit-filter-accordion']}>
        <AccordionItem uuid="subreddit-filter-accordion">
          <AccordionItemHeading>
            <AccordionItemButton>Filter By Subreddits</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            Select:
            <Button
              click={() => {
                dispatch({ type: TOGGLE_ALL, payload: true });
                dispatch({
                  type: TOGGLE_FILTER_CHIP,
                  payload: FilterChipAll.SELECT_ALL
                });
              }}
              text="All"
              bgColor="primary"
            ></Button>
            <Button
              click={() => {
                dispatch({ type: TOGGLE_ALL });
                dispatch({
                  type: TOGGLE_FILTER_CHIP,
                  payload: FilterChipAll.DESELECT_ALL
                });
              }}
              text="None"
              bgColor="primary"
            ></Button>
            <div></div>
            {userSubreddits.map((sub) => (
              <FilterChip subreddit={sub.subreddit} key={sub.subreddit} />
            ))}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

export default AccordionElem;
