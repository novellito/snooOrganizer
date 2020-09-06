import PostCardContent from '../src/components/PostCard/PostCardContent';
import { render, fireEvent } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => {
    return [{ subreddit: 'r/webdev' }];
  },
  useDispatch: () => mockDispatch
}));

describe('PostCardContent test suite', () => {
  let props;
  beforeEach(() => {
    props = {
      url: 'google.com',
      thumbnailUrl: 'google.com',
      postTitle: 'test title',
      subreddit: 'r/webdev',
      author: 'foobar',
      postId: 'abc123',
      unsaveElem: null,
      isDisplayed: true,
      createdTime: '2020-09-03T22:26:11.000Z'
    };
  });
  it('should render PostCardContent with the subreddit in the header', () => {
    const { getByText } = render(<PostCardContent {...props} />);
    expect(getByText(props.subreddit)).toBeTruthy();
    expect(getByText(`u/${props.author}`)).toBeTruthy();
  });

  it('should render PostCardContent with the username in the header', () => {
    props.thumbnailUrl = null;
    const { getByText } = render(<PostCardContent {...props} />);
    expect(getByText(`u/${props.author}`)).toBeTruthy();
  });

  it('should render PostCardContent with the unsaving text', () => {
    props.unsaveElem = { content: 'unsaving!' };
    const { getByText, debug, container } = render(
      <PostCardContent {...props} />
    );
    expect(getByText(props.unsaveElem.content)).toBeTruthy();
  });
});
