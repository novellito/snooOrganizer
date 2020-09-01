import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterToggleUserContent } from '../store/actions';
import { SNOO_BLUE, PRIMARY } from '../constants/colors';

interface FilterPillProps {
  //   bgColor: string;
  //   text: string;
  //   style?: object;
  //   subreddit: any;
  subreddit: string;
  customClass?: string;
  //   click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   disabled?: boolean;
}
const FilterPillWrapper = styled.div`
  display: inline-block;
  background: ${SNOO_BLUE};
  padding: 5px;
  margin: 5px;
  border-radius: 32px;
  font-size: 13px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  &.selected {
    color: ${PRIMARY};
    background-color: white;
    border: 1px solid ${PRIMARY};
    box-shadow: 0 2px 2px 0 #fa7d0966, 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
`;
export const FilterPill = (props: FilterPillProps) => {
  const dispatch = useDispatch();
  const [toggled, setToggle] = useState(false);
  const handleClick = (subreddit: string) => {
    dispatch(filterToggleUserContent(subreddit));
    setToggle(!toggled);
  };
  return (
    <FilterPillWrapper
      onClick={() => handleClick(props.subreddit)}
      className={toggled ? 'selected' : null}
    >
      {props.subreddit}
    </FilterPillWrapper>
  );
};

export default FilterPillWrapper;
