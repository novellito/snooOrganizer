import styled from 'styled-components';
import { TEXT_PRIMARY, TEXT_HEADER, SNOO_BLUE } from '../../constants/colors';
import ClampLines from 'react-clamp-lines';

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
    &.username {
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
interface IPostCardContentProps {
  //   username: string;
  //   title: string;
  //   subredit: string;
  //   postDate: string;
}

export const PostCardContent = (props: IPostCardContentProps) => {
  const text =
    "I teach React courses - here's my collection of over 600 slides on various React topics (hosted on GitHub, licensed under CC-BY-SA)";
  // const text = ' I teach React courses ';
  return (
    <PostCardContentWrapper {...props}>
      <div className="content-header">
        <p className="username">u/Dbossez</p>
        <p className="post-time">3 months ago</p>
      </div>
      {/* show subreddit below if there is a thumbnail OR saved comment */}
      {/* <p className="subreddit">r/mechanicalkeyboards</p> */}
      <ClampLines
        text={text}
        id="really-unique-id"
        ellipsis="..."
        className="post-title" // consider removing class
        innerElement="p"
      />
    </PostCardContentWrapper>
  );
};

export default PostCardContent;
