import Accordion from '../src/components/Accordion';
import { render, fireEvent } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => {
    return [{ subreddit: 'r/webdev' }];
  },
  useDispatch: () => mockDispatch
}));

describe('Accordion test suite', () => {
  it('should render the Accordion', () => {
    const { getByText } = render(<Accordion />);
    const SelectAllBtn = getByText('All');
    const SelectNoneBtn = getByText('None');
    const Chip = getByText('r/webdev');

    expect(SelectAllBtn).toBeTruthy();
    expect(SelectNoneBtn).toBeTruthy();
    expect(Chip).toBeTruthy();

    fireEvent.click(SelectAllBtn);
    expect(mockDispatch).toHaveBeenCalledTimes(2);

    fireEvent.click(SelectNoneBtn);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
});
