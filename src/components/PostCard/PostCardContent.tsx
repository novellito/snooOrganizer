import styled from 'styled-components';
import ClampLines from 'react-clamp-lines';
import Moment from 'react-moment';
import { TEXT_PRIMARY, TEXT_HEADER, SNOO_BLUE } from '../../constants/colors';
import { IPostCardProps } from '../../interfaces/interfaces';

const PostCardContentWrapper = styled.div`
  padding: 16px 16px 0;
  overflow: hidden;
  min-height: 130px;

  .content-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .post-time {
      margin-left: auto;
      color: ${TEXT_PRIMARY};
      font-size: 0.9em;
    }
    + p {
      margin-bottom: 5px;
    }
  }
  p {
    margin: 0;
    &.header-text {
      color: ${TEXT_HEADER};
      font-weight: bold;
      font-size: 1.3em;
    }
  }

  .clamp-lines {
    p {
      font-family: 'Open Sans', sans-serif; /* for text body */
      color: ${TEXT_PRIMARY};
      font-size: 1.1em;
    }

    .clamp-lines__button {
      background: none !important;
      border: none;
      padding: 0 !important;
      font-family: 'Open Sans', sans-serif; /* for text body */
      color: ${SNOO_BLUE};
      text-decoration: underline;
      cursor: pointer;
      outline: none;
      margin-bottom: 15px;
    }
  }
`;

export const PostCardContent = (props: IPostCardProps) => {
  const showSubreddit = props.thumbnailUrl;
  let author = props.author;
  if (props.author.length > 18) {
    author = props.author.substring(0, 15) + '...';
  }
  return (
    <PostCardContentWrapper {...props}>
      <div className="content-header">
        {
          <p className="header-text">
            {showSubreddit ? props.subreddit : `u/${author}`}
          </p>
        }
        <p className="post-time">
          <Moment fromNow>{props.createdTime}</Moment>
        </p>
      </div>
      <p>{showSubreddit ? `u/${props.author}` : ''}</p>
      <ClampLines
        text={props.postTitle || props.commentBody || ''}
        id={props.postId}
        ellipsis="..."
        innerElement="p"
      />
    </PostCardContentWrapper>
  );
};

export default PostCardContent;
