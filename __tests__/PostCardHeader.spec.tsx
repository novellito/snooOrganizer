import PostCardHeader from '../src/components/PostCard/PostCardHeader';
import { render } from '@testing-library/react';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => {
    return [{ subreddit: 'r/webdev' }];
  },
  useDispatch: () => mockDispatch
}));

describe('PostCardHeader test suite', () => {
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

  it('should render the PostCardHeader with a thumbnail image', () => {
    const { getByText, container } = render(<PostCardHeader {...props} />);
    const thumbnail = container.querySelector('img');
    expect(thumbnail).toBeTruthy();
  });

  it('should render the PostCardHeader with the fontawesome icon', () => {
    props.thumbnailUrl = null;
    props.commentBody = 'test';
    const { getByText, container, debug } = render(
      <PostCardHeader {...props} />
    );
    const fa = container.querySelector('svg');

    expect(fa).toBeTruthy();
  });

  it('should render the PostCardHeader with the subreddit', () => {
    props.thumbnailUrl = null;
    const { getByText, container, debug } = render(
      <PostCardHeader {...props} />
    );
    expect(getByText(props.subreddit)).toBeTruthy();
  });

  it('should render PostCardHeader with the unsaving text', () => {
    props.unsaveElem = { header: 'unsaving!' };
    const { getByText, debug, container } = render(
      <PostCardHeader {...props} />
    );
    expect(getByText(props.unsaveElem.header)).toBeTruthy();
  });
});
