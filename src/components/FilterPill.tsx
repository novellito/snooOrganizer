import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterToggleUserContent } from '../store/actions';

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
const FilterPillWrapper = styled.div``;
export const FilterPill = (props: FilterPillProps) => {
  const dispatch = useDispatch();

  const handleClick = (subreddit: string) => {
    dispatch(filterToggleUserContent(subreddit));
  };
  return (
    <FilterPillWrapper onClick={() => handleClick(props.subreddit)}>
      {props.subreddit}
    </FilterPillWrapper>
  );
};

export default FilterPillWrapper;
