import styled from 'styled-components';
import { TEXT_PRIMARY, TEXT_HEADER, SNOO_BLUE } from '../../constants/colors';
import ClampLines from 'react-clamp-lines';
import { IPostCardProps } from '../../interfaces/interfaces';
import Moment from 'react-moment';

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
  }
  p {
    margin: 0;
    &.subreddit {
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
  const text =
    "I teach React courses - here's my collection of over 600 slides on various React topics (hosted on GitHub, licensed under CC-BY-SA)";

  let showSubreddit = props.thumbnailUrl || props.markDown;

  return (
    <PostCardContentWrapper {...props}>
      <div className="content-header">
        {showSubreddit ? (
          <p className="subreddit">{props.subreddit}</p>
        ) : (
          <p className="subreddit"> u/{props.author}</p>
        )}
        <p className="post-time">
          <Moment fromNow>{props.createdTime}</Moment>
        </p>
      </div>
      {showSubreddit ? `u/${props.author}` : <br />}
      <ClampLines
        text={text}
        id={props.postId}
        ellipsis="..."
        className="post-title" // consider removing class
        innerElement="p"
      />
    </PostCardContentWrapper>
  );
};

export default PostCardContent;
