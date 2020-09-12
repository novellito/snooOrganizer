import FilterChip from '../src/components/FilterChip';
import { render, fireEvent } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => {
    return [];
  },
  useDispatch: () => mockDispatch
}));

describe('FilterChip test suite', () => {
  it('should render the FilterChip', () => {
    const props = {
      subreddit: 'r/webdev',
      userSubreddits: [{ isDisplayed: true, subreddit: 'r/webdev' }]
    };

    const { getByText } = render(<FilterChip {...props} />);
    const FilterChipElem = getByText(props.subreddit);

    expect(FilterChipElem).toBeTruthy();

    fireEvent.click(FilterChipElem);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
