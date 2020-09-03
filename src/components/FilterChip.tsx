import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { filterUserPostCards } from '../store/actions';
import { SNOO_BLUE, PRIMARY } from '../constants/colors';
import { IUserState } from '../interfaces/interfaces';

interface FilterChipProps {
  subreddit: any;
}
const FilterChipWrapper = styled.div`
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
  &.deselected {
    color: ${PRIMARY};
    background-color: white;
    border: 1px solid ${PRIMARY};
    box-shadow: 0 2px 2px 0 #fa7d0966, 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
`;
export const FilterChip = (props: FilterChipProps) => {
  const dispatch = useDispatch();
  const userSubreddits = useSelector(
    ({ user }: { user: IUserState }) => user.userSubreddits
  );
  return (
    <FilterChipWrapper
      onClick={() => dispatch(filterUserPostCards(props.subreddit))}
      className={
        userSubreddits.some(
          (elem) => props.subreddit === elem.subreddit && !elem.isDisplayed
        )
          ? 'deselected'
          : null
      }
    >
      {props.subreddit}
    </FilterChipWrapper>
  );
};

export default FilterChipWrapper;
