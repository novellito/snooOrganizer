import PostCardAction from '../src/components/PostCard/PostCardAction';
import { render, fireEvent } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => {
    return [{ subreddit: 'r/webdev' }];
  },
  useDispatch: () => mockDispatch
}));

describe('PostCardAction test suite', () => {
  it('should render the PostCardAction', () => {
    const props = {
      url: 'google.com',
      thumbnailUrl: 'google.com',
      postTitle: 'test title',
      subreddit: 'r/webdev',
      author: 'foobar',
      postId: 'abc123',
      unsaveElem: '',
      isDisplayed: true,
      createdTime: '2020-09-03T22:26:11.000Z'
    };
    const { getByText, debug, container } = render(
      <PostCardAction {...props} />
    );
    const UnsaveBtn = getByText('Unsave');

    expect(UnsaveBtn).toBeTruthy();

    fireEvent.click(UnsaveBtn);
    const YesBtn = getByText('Yes');
    const NoBtn = getByText('No');

    // debug(container);
    expect(YesBtn).toBeTruthy();
    expect(NoBtn).toBeTruthy();

    fireEvent.click(YesBtn);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
